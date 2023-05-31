import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';
import CreateMovie from '../utils/CreateMovie.js';

const router = express.Router();

router.get('/', (req, res) => {
  appDataSource
    .getRepository(Movie)
    .findOne({ where: { id: 4 } })
    .then(function (films) {
      res.json(films);
    });
});

router.post('/new', function (req, res) {
  const userRepository = appDataSource.getRepository(Movie);
  CreateMovie(req.body, res, userRepository);
});

export default router;
