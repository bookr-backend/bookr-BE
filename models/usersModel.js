const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const db = require('../database/dbConfig.js');

module.exports = {
  add,
  authenticate,
  find,
  findBy,
  getAll,
  insert
};

async function add(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}

function find() {
  return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('users').where(filter);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

async function getAll() {
  return db('users');
}

async function insert(user) {
  return db('users')
    .insert(user)
    .return(user);
}

function authenticate(req, res, next) {
  const token = req.get('authorization');

  if (token) {
    jwt.verify(token, secrets, (err, decodedToken) => {
      if (err) return res.status(401).json(err);

      req.decodedToken = decodedToken;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'Please provide a token.'
    });
  }
}
