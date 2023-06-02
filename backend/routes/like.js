import express from 'express';
import { Repository } from 'typeorm';
import { appDataSource } from '../datasource.js';
import Genre from '../entities/genre.js';
import Collection from '../entities/collection.js';
import Movie from '../entities/movie.js';
import MovieGenre from '../entities/movie_genre.js';
import UserMovie from '../entities/user_movie.js';
import recommend from '../utils/recommandation.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const genreRepository = appDataSource.getRepository(Genre);
  const collectionRepository = appDataSource.getRepository(Collection);
  const movieRepository = appDataSource.getRepository(Movie);
  const nbgenre = await genreRepository.count({});
  const nbcollection = await collectionRepository.count({});
  const popMax = await movieRepository.find({
    order: {
      popularity: 'DESC',
    },
    take: 1,
  });

  res.json({
    nbgenres: nbgenre,
    nbcollection: nbcollection,
    pop: popMax[0].popularity,
  });
});

router.get('/genres/:idFilm', async (req, res) => {
  const genres = await appDataSource.getRepository(MovieGenre).find({
    where: {
      idmovie: req.params.idFilm,
    },
    select: { idgenre: true },
  });
  const genresID = genres.map((element) => {
    return element.idgenre;
  });
  res.json(genresID);
});

router.get('/collection/:idFilm', async (req, res) => {
  const movie = await appDataSource.getRepository(Movie).findOneBy({
    id: req.params.idFilm,
  });
  if (movie && movie.collectionid) {
    res.json(movie.collectionid);
  } else {
    res.json(-1);
  }
});

router.get('/allwatched/:idUser', async (req, res) => {
  const movies = await appDataSource.getRepository(UserMovie).find({
    where: {
      iduser: req.params.idUser,
      watched: true,
    },
  });
  const moviesID = movies.map((element) => {
    return element.idmovie;
  });
  res.json(moviesID);
});

router.get('/popularity/:idFilm', async (req, res) => {
  const movieRepository = appDataSource.getRepository(Movie);
  const popMax = await movieRepository.find({
    order: {
      popularity: 'DESC',
    },
    take: 1,
  });
  const pop = await movieRepository.findOneBy({ id: req.params.idFilm });
  if (pop !== null) {
    const normalizepop = pop.popularity / popMax[0].popularity;
    res.json(normalizepop);
  } else {
    res.json(0);
  }
});

router.get('/fabien/:idUser', async (req, res) => {
  const movieRepository = appDataSource.getRepository(Movie);
  const allId = await movieRepository.find({ where: {}, select: { id: true } });
  const allId2 = allId.map((element) => {
    return element.id;
  });
  const recommanded = await recommend(req.params.idUser, allId2);
  res.json(recommanded);
});

export default router;
