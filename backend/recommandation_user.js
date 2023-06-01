import { DataSource } from 'typeorm';
import { User } from './entities/user.js';
import { Movie } from './entities/movies.js';
import { Collection } from './entities/collections.js';
import { Genre } from './entities/genres.js';
import { UserMovie } from './entities/users_movies.js';
import { GenreMovie } from './entities/genres_movies.js';

// Récupération de données importantes pour la suite de la BDD
async function get_data() {
  const [nb_genres, nb_collections, movie_pop_max] = await Promise.all([
    appDataSource.getRepository(Genre).count(),
    appDataSource.getRepository(Collection).count(),
    appDataSource.getRepository(Movie).findOne({
      order: {
        popularity: 'DESC'
      }
    })
  ]);
  return [nb_genres, nb_collections, movie_pop_max.popularity];
}

async function get_collection(movieId) {
  const movies = await appDataSource.getRepository(Movie).find({
    where: {
      id_movie: movieId
    }
  });
  const collection = movies.map((movie) => movie.collection)[0];
  return collection;
}

async function get_genres(movieId) {
  const genres = await appDataSource
    .getRepository(GenreMovie)
    .find({
      where: {
        movie: movieId
      },
    })
    .then((genreMovies) => genreMovies.map((gm) => gm.id_genre));
  return genres;
}

async function get_watched(userId) {
  const user = await appDataSource
    .getRepository(UserMovie)
    .findOne({
      where: {
        id_user: userId,
        watched: true
      },
    })
    .then((userMovie) => userMovie.id_movie);
  return user;
}

async function get_nb_watched_genres(watched, number_genres) {
  const v = Array(number_genres).fill(0);
  await Promise.all(
    watched.map(async (movie) => {
      const genres = await get_genres(movie.id_movie);
      genres.forEach((genre) => {
        v[genre.id_genre - 1]++;
      });
    })
  );
  return v;
}

async function get_nb_watched_collections(watched, number_collections) {
  const v = Array(number_collections).fill(0);
  await Promise.all(
    watched.map(async (movie) => {
      const id_collection = await get_collection(movie.id_movie);
      v[id_collection - 1]++;
    })
  );
  return v;
}

async function get_popularity_normalized(movieId,popularity_max) {
  const movie = await appDataSource.getRepository(Movie).findOne({
    where: {
      id_movie: movieId
    }
  });
  return movie.popularity / popularity_max;
}

function normalize(vector) {
  let cst_normalise = 0;
  vector.forEach((element) => { if (element !== 0){
    cst_normalise += 1;
  }});
  vector.map((element)=> element/cst_normalise);
  return vector
}

async function content_user(userId, number_genres, number_collections) {
  const watched = await get_watched(userId);
  const nb_watched_genres = await get_nb_watched_genres(watched, number_genres);
  const nb_watched_collections = await get_nb_watched_collections(watched, number_collections);
  const normalized_genres = normalize(nb_watched_genres);
  const normalized_collections = normalize(nb_watched_collections);
  const userVector = normalized_genres.concat(normalized_collections);
  return userVector;
}

async function content_movie(movieId, number_genres, number_collections) {
  const collections = await get_collection(movieId);
  const genres = await get_genres(movieId);
  const vector = Array(number_genres + number_collections).fill(0);
  collections.forEach((collection) => {
    vector[collection - 1] = 1;
  });
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

async function content_similarity(userId, movieId, number_genres, number_collections, popularity_max) {
  const userVector = await content_user(userId, number_genres, number_collections);
  const movieVector = await content_movie(movieId, number_genres, number_collections);
  const popularity_normalized = await get_popularity_normalized(movieId, popularity_max);
  const movie_norm = Math.sqrt(dotProduct(movie_vector,movie_vector));
  const user_norm = Math.sqrt(dotProduct(user_vector,user_vector));
  if ((movie_norm !== 0)&&(user_norm !==0)){
      let cos = dotProduct(movie_vector, user_vector)/(movie_norm*user_norm);
      let weight_cos = Math.min(nb*cos,50);
      let weight_pop = Math.max(0,(50-nb));
      let similarity = (weight_cos*cos - weight_pop*pop)/50;
  } else {
    let similarity = 0;
  };
  return similarity
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

async function content_ranking(userId, moviesId, number_genres, number_collections, popularity_max) {
  const rank = [];
  for (const movieId of moviesId) {
    const similarity = await content_similarity(userId, movieId, number_genres, number_collections, popularity_max);
    rank.push([similarity, movieId]);
  }
  rank.sort(comparer);
  const recommendedMovies = rank.map((pair) => pair[1]);
  return recommendedMovies;
}

async function recommend(userId, moviesId) {
  const [number_genres, number_collections,popularity_max] = await get_data();
  const recommendedMovies = await content_ranking(userId, moviesId, number_genres, number_collections);
  return recommendedMovies;
}
