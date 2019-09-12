const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  getAll,
  update,
  remove
};

// CREATE
async function add(user) {
  const [id] = await db('users').returning('id').insert(user);
  return findById(id);
}

// READ
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

// UPDATE
function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes, '*');
}

// DELETE
function remove(id) {
  return db('users')
    .where({ id })
    .del();
}
