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

router.post('/like', (req, res) => {
  res.json(req.body);
});

router.post('/new', function (req, res) {
  const userRepository = appDataSource.getRepository(User);
  //req.body.password = hash(req.body.password)
  const newUser = userRepository.create(req.body);
  userRepository
    .insert(newUser)
    .then(function (user) {
      appDataSource
        .getRepository(User)
        .findOneBy({ id: user.identifiers[0].id })
        .then((userDB) => {
          console.log(userDB.cookieSession);
          userDB.cookieSession = crypto.randomBytes(20).toString('hex');
          appDataSource.getRepository(User).save(userDB);
          res.json({
            session: userDB.cookieSession,
            id: userDB.id,
            username: userDB.username,
            answer: true,
          });
        });
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `User with email "${newUser.mail}" already exists`,
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

router.post('/token', (req, res) => {
  appDataSource
    .getRepository(User)
    .findOneBy({ id: req.body.id, cookieSession: req.body.session })
    .then((user) => {
      if (user === null) {
        res.json({ answer: false });
      } else {
        res.json({
          session: user.cookieSession,
          id: user.id,
          username: user.username,
          answer: true,
        });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Error ' });
    });
});

router.post('/token/new', (req, res) => {
  const token = crypto.randomBytes(20).toString('hex');
  appDataSource
    .getRepository(User)
    .save({ id: req.body.id, cookieSession: token })
    .then((user) => {
      res.json(user);
    });
});

router.post('/connection', (req, res) => {
  appDataSource
    .getRepository(User)
    .findOneBy({ email: req.body.email, password: req.body.password })
    .then(function (user) {
      if (user === null) {
        res.json({ answer: false });
      } else {
        user.answer = true;
        res.json({
          session: user.cookieSession,
          id: user.id,
          username: user.username,
          answer: true,
        });
      }
    })
    .catch(function () {
      res.status(500).json({ message: 'Error ' });
    });
});

export default router;
