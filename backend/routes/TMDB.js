import express from 'express';
import CreateMovie from '../utils/CreateMovie.js';
import fetchTMDB from '../utils/fetchTMDB.js';
import fetchDataMovie from '../utils/fetchDataMovie.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    for (let page = 1; page <= 10; page++) {
      const ids = await fetchTMDB(page);

      const movieDetails = await fetchDataMovie(ids);
      movieDetails.forEach((movie) => {
        movie['idTMDB'] = movie.id;
        CreateMovie(movie, null);
      });
    }
    res.json({ Résultat: 'La base de données a été remplie avec succès !' });
    console.log('La base de données a été remplie avec succès !');
  } catch (error) {
    res.json({ Résultat: `Une erreur s'est produite : ${error}` });
    console.error("Une erreur s'est produite :", error);
  }
});

export default router;
