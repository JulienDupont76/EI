import express from 'express';
import { ILike } from 'typeorm';
import { appDataSource } from '../datasource.js';
import CreateMovie from '../utils/CreateMovie.js';
import Genre from '../entities/genre.js';
import Movie from '../entities/movie.js';

const router = express.Router();

router.get('/research', (req, res) => {
  appDataSource
    .getRepository(Movie)
    .find({ where: { title: ILike(`%${req.query.research}%`) } })
    .then(function (movies) {
      res.json(movies);
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({
        error: "Une erreur s'est produite lors de la recherche des films.",
      });
    });
});

router.get('/:id', async (req, res) => {
  const genreRepository = appDataSource.getRepository(Genre);
  const movieRepository = appDataSource.getRepository(Movie);
  const newGenre = genreRepository.create({
    name: 'Anime',
  });
  movieRepository
    .findByIds([84, 85]) // Remplacez [1, 2] par les identifiants des collections que vous souhaitez associer
    .then((movies) => {
      newGenre.movies = movies;
      genreRepository
        .save(newGenre) // Utilisez la méthode "save" pour enregistrer l'entité avec la relation many-to-many
        .then(function (newDocument) {
          res.status(201).json(newDocument);
        })
        .catch(function (error) {
          console.error(error);
          if (error.code === '23505') {
            res.status(400).json({
              message: `User with email "${newGenre.name}" already exists`,
            });
          } else {
            res.status(500).json({ message: 'Error while creating the user' });
          }
        });
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while fetching collections' });
    });
});
/*appDataSource
    .getRepository(Movie)
    .findOne({ where: { idTMDB: req.params.id } })
    .then(function (films) {
      if (films === null) {
        res.json({ erreur: "Le film recherché n'existe pas" });
      } else {
        res.json(films);
      }
    });
});*/

/*router.get('/test/oui', (req, res) => {
  appDataSource
    .getRepository(Genre)
    .find({
      relations: {
        collections: true,
      },
    })
    .then(function (films) {
      if (films === null) {
        res.json({ erreur: "Le film recherché n'existe pas" });
      } else {
        res.json(films);
      }
    });
});*/

router.post('/new', function (req, res) {
  //const userRepository = appDataSource.getRepository(Movie);
  console.log('test');
  CreateMovie(req.body, res);
});

export default router;
