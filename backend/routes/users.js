import express from 'express';
import crypto from 'crypto';
import { Repository } from 'typeorm';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';

const router = express.Router();

router.get('/', function (req, res) {
  appDataSource
    .getRepository(User)
    .find({})
    .then(function (users) {
      res.json({ users: users });
    });
});

router.post('/new', function (req, res) {
  const userRepository = appDataSource.getRepository(User);
  //req.body.password = hash(req.body.password)
  const newUser = userRepository.create(req.body);

  userRepository
    .insert(newUser)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `User with email "${newUser.email}" already exists`,
        });
      } else {
        res.status(500).json({ message: 'Error while creating the user' });
      }
    });
});

router.delete('/:userId', function (req, res) {
  appDataSource
    .getRepository(User)
    .delete({ id: req.params.userId })
    .then(function () {
      res.status(204).json({ message: 'User successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the user' });
    });
});

router.post('/connection', (req, res) => {
  let find;
  if (req.body.session) {
    find = { cookieSession: `${req.body.session}` };
  } else {
    find = {
      email: `${req.body.email}`,
      password: `${req.body.password}`,
    };
  }

  appDataSource
    .getRepository(User)
    .find({
      where: find,
    })
    .then(function (users) {
      if (users.length === 0) {
        res.json({ error: true });
      } else {
        appDataSource
          .getRepository(User)
          .findBy({ id: users.id })
          .then((userDB) => {
            userDB[0].cookieSession = crypto.randomBytes(20).toString('hex');
            appDataSource.getRepository(User).save(userDB);
            res.json({
              session: userDB[0].cookieSession,
              id: userDB[0].id,
              username: userDB[0].username,
              error: false,
            });
          });
      }
    })
    .catch(function () {
      res.status(500).json({ message: 'Error ' });
    });
});

export default router;
