const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

const authRouter = require('../auth/authRouter.js');
const Users = require('../models/usersModel.js');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.get('/api/users', (req, res) => {
  Users.getAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => res.status(500).json({ message: 'Unable to retrieve users' }));
});

server.get('/', (req, res) => {
  res.send('Welcome to Bookr!');
});

module.exports = server;
