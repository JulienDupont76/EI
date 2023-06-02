import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';
import Genre from '../entities/genre.js';
import MovieGenre from '../entities/movie_genre.js';

const CreateMovie = (movie, res) => {
  const userRepository = appDataSource.getRepository(Movie);
  const newMovie = userRepository.create({
    title: movie.title,
    overview: movie.overview,
    adult: movie.adult,
    backdrop_path: movie.backdrop_path,
    collectionid: movie.collectionid,
    budget: movie.budget,
    // genres: movie.genres,
    idTMDB: movie.idTMDB,
    original_language: movie.original_language,
    original_title: movie.original_title,
    popularity: movie.popularity,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    revenue: movie.revenue,
    runtime: movie.runtime,
    status: movie.status,
    tagline: movie.tagline,
    video: movie.video,
    vote_average: movie.vote_average,
  });

  userRepository
    .insert(newMovie)
    .then(async (newMovie) => {
      if (movie.genres !== []) {
        for (const genre of movie.genres) {
          const genreRepository = appDataSource.getRepository(Genre);
          const query = await genreRepository.findOneBy({
            name: genre.name,
          });

          if (query === null) {
            await genreRepository.save({
              name: genre.name,
            });
          }
          const query2 = await genreRepository.findOneBy({
            name: genre.name,
          });
          const MovieGenreRepository = appDataSource.getRepository(MovieGenre);
          await MovieGenreRepository.save({
            idmovie: newMovie.identifiers[0].id,
            idgenre: query2.id,
          });
        }
      }
      if (res !== null) {
        res.status(201).json(newMovie);
      }
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        if (res !== null) {
          res.status(400).json({
            message: `User with email "${newMovie.title}" already exists`,
          });
        }
      } else {
        if (res !== null) {
          res.status(500).json({ message: 'Error while creating the movie' });
        }
      }
    });
};

export default CreateMovie;
