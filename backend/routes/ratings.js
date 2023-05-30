import express from 'express';
import { appDataSource } from '../datasource.js';
import Rating from '../entities/rating.js';

const router = express.Router();

router.get('/', function (req, res) {
    const ratings = [];
    res.json(ratings);
});

router.post('/new', function (req, res) {
    const rep = appDataSource.getRepository(Rating);
    const rating = rep.create({
        movie_id: req.body.movie_id,
        user_id: req.body.user_id,
        rating: req.body.rating});
    
    rep.insert(rating)
    .then(function (_) {
        res.status(200).json({"message":"Rating successfully added to database"});
      });
});

export default router;
