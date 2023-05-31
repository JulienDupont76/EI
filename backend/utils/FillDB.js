import CreateMovieAPI from './CreateMovieAPI.js';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';
import fetchTMDB from './fetchTMDB.js';
import fetchDataMovie from './fetchDataMovie.js';

const FillDB = async () => {
  try {
    const id = await fetchTMDB();
    const movieDetails = await fetchDataMovie(id);
    movieDetails.forEach((movie) => {
      movie['idTMDB'] = movie.id;
      const userRepository = appDataSource.getRepository(Movie);
      CreateMovieAPI(movie, userRepository);
    });

    console.log('La base de données a été remplie avec succès !');
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
};

export default FillDB;
