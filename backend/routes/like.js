import express from 'express';
const router = express.Router();
// import crypto from 'crypto';
// import { Repository } from 'typeorm';
import { appDataSource } from '../datasource.js';
import UserMovie from '../entities/user_movie.js';

router.post('/', function (req, res) {
  //   const isLiked = req.body.isLiked;
  const userMovieRep = appDataSource.getRepository(UserMovie);
  //req.body.password = hash(req.body.password)
  const newLike = userMovieRep.create(req.body);

  userMovieRep
    .insert(newLike)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: '',
        });
      } else {
        res.status(500).json({ message: 'Error while creating the user' });
      }
    });
});

export default router;
