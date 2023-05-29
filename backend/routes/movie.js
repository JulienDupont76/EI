import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  const movies = [];
  res.json(movies);
});

router.get('/new', (req, res) => {
  res.redirect('https://linkcs.fr/');
});

export default router;
