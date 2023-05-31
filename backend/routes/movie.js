import express from 'express';

import Movie from '../entities/movie.js';

const router = express.Router();

router.get('/', (req, res) => {
  const movies = [];
  res.json(movies);
});

router.post('/new', function (req, res) {
  const rep = appDataSource.getRepository(Movie);
  const movie = rep.create({
      title: req.body.title,
      date: req.body.date});
      rep.insert(movie)

  .then(function (_) {
      res.status(200).json({"message":"Movie successfully added to database"});
    });
});

export default router;
