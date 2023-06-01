import { DataSource } from 'typeorm';
import { User } from './entities/user.js';
import { Movie } from './entities/movies.js';
import { Collection } from './entities/collections.js';
import { Genre } from './entities/genres.js';
import { GenreMovie } from './entities/genres_movies.js';

// Récupération de données importantes pour la suite de la BDD
function get_data(){
  Promise.all([
    appDataSource.getRepository(Genres).count(),
    appDataSource.getRepository(Collections).count(),
    appDataSource.getRepository(Movie).findOne({
      order: {
        popularity: 'DESC'
      }
    })
  ]).then(function ([number_genres, number_collections, movie_pop_max]) {
    const nb_genres = number_genres;
    const nb_collections = number_collections;
    const popularity_max = movie_pop_max.popularity
  });
    return [nb_genres,nb_collections,popularity_max]
  }

function get_collection(movieId){
  appDataSource.getRepository(Movie).find({
    where: {
      id_movie: movieId
    }
  }).then(function (movies) {
    const collection = genreMovies.map((movie) => movie.collection[0]);
    return collection
  });
}

function get_genres(movie) {
  const movieId = movie.id;
  appDataSource.getRepository(GenreMovie).find({
    where: {
      id_movie: movieId
    }
  }).then(function (genreMovies) {
    // Extraire les genres de la relation genre_movie
    const genres = genreMovies.map((genreMovie) => genreMovie.id_genre);
    return genres
  });
};

function get_watched(userId) {
  appDataSource.getRepository(userMovie).find({
    where: {
      id_user: userId,
      watched: true
  }}).then(function (userWatched) {
    // Extraire les genres de la relation genre_movie
    const watched = userWatched.map((userMovie) => userMovie.id_movie);
    return watched
  });
};

function get_nb_watched_genres(watched,number_genres){
  const v = Array(number_genres).fill(0);
  watched.forEach(function(movieId, index) {
    appDataSource.getRepository(GenreMovie).find({
      where: {
        id_movie: movieId
      }
    }).then(function (genreMovies) {
      // Extraire les genres de la relation genre_movie
      const genres = genreMovies.map((genreMovie) => genreMovie.id_genre);
  });
  genres.forEach((genreId,index) => { v[genreId] += 1; });
})
  return v
  }


function get_nb_watched_collections(watched,number_collections){
  const v = Array(number_collections).fill(0);
  watched.forEach(function(movieId, index) {
    id_collection = get_collection(movieId);
    v[id_collection] += 1;})
  return v
  }

function get_popularity_normalized(movieId){
  appDataSource.getRepository(Movie).find({
    where: {
      id_movie: movieId
    }
  }).then(function (movies) {
    // Extraire les genres de la relation genre_movie
    const movie_pop = movies.map((movie) => movie.popularity)[0]; //Il n'y a qu'une ligne
});
  return movie_pop/movie_pop_max
}

function normalise(vector){
  let cst_normalise = 0;
  vector.forEach((element) => { if (element !== 0){
    cst_normalise += 1;
  }});
  vector.map((element)=> element/cst_normalise);
  return vector

}
// Représentation d'un utilisateur et d'un movie sous la forme d'un vecteur
function content_user(userId, number_genres, number_collections){
    const vector = [];
    //Pour les coordonnées de 0 à nb_collections-1, vaut le nombre de films vus appartenant au genre associé
    watched = get_watched(userId);
    nb_watched_genres = get_nb_watched_genres(watched,number_genres);
    for (let i = 0; i < nb_watched_genres.length; i++) {
      vector.push(nb_watched_genres[i])
    };
    nb_watched_collections = get_nb_watched_collections(watched,number_collections);
    for (let i = 0; i < nb_watched_collections.length; i++) {
      vector.push(nb_watched_genres[i+nb_watched_genres.length])
    };
    return normalise(vector)
}

function content_movie(movieId,number_genres,number_collections){
    const vector = [];
    //Pour les coordonnées de 0 à nb_collections-1, vaut 1 si le film appartient à la dite-collection, 0 sinon
    let id_collection = get_collection(movieId);
    if (id_collection == null) {
      for (let i = 0; i < number_collections; i++) {
        vector.push(0);
      }
    }
    else {
      for (let i = 0; i < number_collections; i++) {
        if (i === id_collection) {
          vector.push(1);
        }
        else {
          vector.push(0);
        }
      }
    }
    // Pour les coordonnées de nb_collections à nb_collections+nb_genres-1, vaut 1 si le film est du genre concerné, 0 sinon
    const genres = get_genres(movie)
    if (id_collection === null) {
      for (let i = 0; i < number_collections; i++) {
        vector.push(0);
      }
    }
    else {
      for (let i = number_collections; i < number_collections+number_genres; i++) {
        if (genres.inclues(i)) {
          vector.push(1);
        }
        else {
          vector.push(0);
        }
      }
    }
    return vector

};



// Calcul de la similarité entre un utilisateur et un  film

function dotProduct(vector1, vector2) {
    if (vector1.length !== vector2.length) {
      throw new Error("Les vecteurs doivent avoir la même taille");
    }
  
    let result = 0;
    for (let i = 0; i < vector1.length; i++) {
      result += vector1[i] * vector2[i];
    }
  
    return result;
  };

function content_similarity(userId, movieId){
    const nb = get_watched(userId).length; //Nombre de films vus par user
    const pop = get_popularity_normalized(movieId); //Popularité du film
    const [nb_genres, nb_collections, popularity_max] = get_data();
    const movie_vector = content_movie(movieid, nb_genres, nb_collections);
    const user_vector = content_user(userId, nb_genres, nb_collections);
    const movie_norm = Math.sqrt(dotProduct(movie_vector,movie_vector));
    const user_norm = Math.sqrt(dotProduct(user_vector,user_vector));
    if ((movie_norm !== 0)&&(user_norm !==0)){
        let cos = dotProduct(movie_vector, user_vector)/(movie_norm*user_norm);
        let weight_cos = Math.min(nb*cos,50);
        let weight_pop = Math.max(0,(50-nb));
        let result = (weight_cos*cos - weight_pop*pop)/50;
    }
    else{ let result = 0 ;}
    return result;
};

// Pour renvoyer un classement des movies les plus pertinents pour un utilisateur, avec la similiarité associée

function comparer(a, b) {
    const valeurA = a[0];
    const valeurB = b[0];
    
    if (valeurA < valeurB) {
      return -1;
    } else if (valeurA > valeurB) {
      return 1;
    } else {
      return 0;
    }
  };

// Fonction finale : prend en arguments un utilisateur et l'ensemble des films contenus dans la base de données, et renvoie
// les films ordonnés du plus recommandable au moins recommandable

function content_ranking(userId, moviesId){
  const rank = [];
  movies.forEach((movieId) => {
    let similarity = content_similarity(userId,movieId);
    rank.push((similarity,movieId))
})
  rank.sort(comparer);
  const movieIds = rank.map((pair) => pair[1]);
  return movieIds
}