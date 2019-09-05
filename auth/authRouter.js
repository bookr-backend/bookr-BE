const router = require('express').Router();
const bcrypt = require('bcryptjs');
const authToken = require('./authenticate-token');
const db = require('../database/dbConfig.js');

const Users = require('../models/usersModel');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error registering user.' });
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = authToken.genToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/users', (req, res) => {
  db('users')
    .then(users => {
      users = users.map(user => {
        return {
          id: user.id,
          username: user.username,
          password: user.password
        };
      });
      res.status(200).json(users);
    })
    .catch(err =>
      res.status(500).json({
        message: 'Error getting users.'
      })
    );
});

module.exports = router;
