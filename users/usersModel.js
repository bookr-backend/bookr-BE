const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  getAll,
  insert,
  update,
  remove
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

function remove(id) {
  return db('users')
    .where({ id })
    .del();
}

function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes, '*');
}

async function insert(user) {
  return db('users')
    .insert(user)
    .return(user);
}
