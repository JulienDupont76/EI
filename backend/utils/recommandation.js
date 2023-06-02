import { DataSource } from 'typeorm';
import axios from 'axios';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';
import Movie from '../entities/movie.js';
import Collection from '../entities/collection.js';
import Genre from '../entities/genre.js';
import UserMovie from '../entities/user_movie.js';
import MovieGenre from '../entities/movie_genre.js';

// Récupération de données importantes pour la suite de la BDD
async function get_data() {
  const response = await axios.get('http://localhost:8000/recommandation/');
  const nb_genres = response.data.nbgenres;
  const nb_collections = response.data.nbcollection;
  const popmax = response.data.pop;

  return [nb_genres, nb_collections, popmax];
}

async function get_collection(movieId) {
  const response = await axios.get(
    `http://localhost:8000/recommandation/collection/${movieId}`
  );
  const id_collection = response.data;

  return id_collection;
}

async function get_genres(movieId) {
  const response = await axios.get(
    `http://localhost:8000/recommandation/genres/${movieId}`
  );
  const id_genres = response.data;

  return id_genres;
}

async function get_watched(userId) {
  const response = await axios.get(
    `http://localhost:8000/recommandation/allwatched/${userId}`
  );
  const movies_id = response.data;

  return movies_id;
}

async function get_nb_watched_genres(watched, number_genres) {
  const v = Array(number_genres).fill(0);
  await Promise.all(
    watched.map(async (movie) => {
      const idgenres = await get_genres(movie.id);
      idgenres.forEach((idgenre) => {
        v[idgenre - 1]++;
      });
    })
  );

  return v;
}

async function get_nb_watched_collections(watched, number_collections) {
  const v = Array(number_collections).fill(0);
  await Promise.all(
    watched.map(async (movie) => {
      const id_collection = await get_collection(movie.id);
      v[id_collection - 1]++;
    })
  );

  return v;
}

async function get_popularity_normalized(movieId) {
  const response = await axios.get(
    `http://localhost:8000/recommandation/popularity/${movieId}`
  );
  const pop = response.data;

  return pop;
}

function normalize(vector) {
  let cst_normalise = 0;
  vector.forEach((element) => {
    if (element !== 0) {
      cst_normalise += 1;
    }
  });
  vector = vector.map((element) => element / cst_normalise);

  return vector;
}

async function content_user(userId, number_genres, number_collections) {
  const watched = await get_watched(userId);
  const nb_watched_genres = await get_nb_watched_genres(watched, number_genres);
  const nb_watched_collections = await get_nb_watched_collections(
    watched,
    number_collections
  );
  const normalized_genres = normalize(nb_watched_genres);
  const normalized_collections = normalize(nb_watched_collections);
  const vector = Array(number_genres + number_collections).fill(0);
  const userVector = normalized_genres.concat(normalized_collections);

  return userVector;
}

async function content_movie(movieId, number_genres, number_collections) {
  const collection = await get_collection(movieId);
  const genres = await get_genres(movieId);
  const vector = Array(number_genres + number_collections).fill(0);
  vector[collection - 241] = 1;
  genres.forEach((genre) => {
    vector[genre.id_genre - 1] = 1;
  });

  return vector;
}

function dotProduct(vector1, vector2) {
  if (vector1.length !== vector2.length) {
    throw new Error('Vector lengths do not match.');
  }
  let result = 0;
  for (let i = 0; i < vector1.length; i++) {
    result += vector1[i] * vector2[i];
  }

  return result;
}

async function content_similarity(
  userId,
  movieId,
  number_genres,
  number_collections,
  popularity_max,
  nb_watched_movies
) {
  const user_vector = await content_user(
    userId,
    number_genres,
    number_collections
  );
  const movie_vector = await content_movie(
    movieId,
    number_genres,
    number_collections
  );
  const popularity_normalized = await get_popularity_normalized(movieId);
  const movie_norm = Math.sqrt(dotProduct(movie_vector, movie_vector));
  const user_norm = Math.sqrt(dotProduct(user_vector, user_vector));
  if (movie_norm !== 0 && user_norm !== 0) {
    const cos = parseFloat(
      dotProduct(movie_vector, user_vector) / (movie_norm * user_norm)
    );
    const weight_cos = Math.min(nb_watched_movies * cos, 50);
    const weight_pop = Math.max(0, 50 - nb_watched_movies);
    const similarity =
      (weight_cos * cos + weight_pop * popularity_normalized) / 50;
    console.log('weight_cos' + weight_cos);

    return similarity;
  } else {
    const similarity = 0;

    return similarity;
  }
}

function comparer(a, b) {
  if (a[0] < b[0]) {
    return 1;
  }
  if (a[0] > b[0]) {
    return -1;
  }

  return 0;
}

async function content_ranking(
  userId,
  moviesId,
  number_genres,
  number_collections,
  popularity_max,
  nb_watched_movies
) {
  const rank = [];
  for (const movieId of moviesId) {
    const similarity = await content_similarity(
      userId,
      movieId,
      number_genres,
      number_collections,
      popularity_max,
      nb_watched_movies
    );
    rank.push([similarity, movieId]);
  }
  rank.sort(comparer);
  const recommendedMovies = rank.map((pair) => pair[1]);

  return recommendedMovies;
}

async function recommend(userId, moviesId) {
  const [number_genres, number_collections, popularity_max] = await get_data();
  const watched = await get_watched(userId);
  if (watched === []) {
    return [];
  } else {
    const nb_watched_movies = watched.length;
    const recommendedMovies = await content_ranking(
      userId,
      moviesId,
      number_genres,
      number_collections,
      popularity_max,
      nb_watched_movies
    );

    return recommendedMovies;
  }
}

export default recommend;
