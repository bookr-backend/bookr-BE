const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

const authRouter = require('../auth/authRouter.js');
const bookRouter= require('../books/book-router.js');
const  reviewRouter= require('../reviews/review-router.js');


server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/books', bookRouter);
server.use('/api/reviews',reviewRouter);

server.get('/', (req, res) => {
  res.send('Welcome to Bookr!');
});

module.exports = server;

 