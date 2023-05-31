import express from 'express';
import { In } from 'typeorm';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';
import CreateMovie from '../utils/CreateMovie.js';
import Genre from '../entities/genre.js';
import Collection from '../entities/collection.js';

const router = express.Router();

router.get('/:id', (req, res) => {
  const genreRepository = appDataSource.getRepository(Genre);
  const collectionRepository = appDataSource.getRepository(Collection);
  const newGenre = genreRepository.create({
    name: 'Horreur',
  });
  collectionRepository
    .findByIds([1, 2]) // Remplacez [1, 2] par les identifiants des collections que vous souhaitez associer
    .then((collections) => {
      newGenre.collections = collections;
      console.log(newGenre.collections);
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

router.get('/test/oui', (req, res) => {
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
});

router.post('/new', function (req, res) {
  const userRepository = appDataSource.getRepository(Movie);
  CreateMovie(req.body, res, userRepository);
});

export default router;
