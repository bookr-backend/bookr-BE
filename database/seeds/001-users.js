const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'bookworm323', password: bcrypt.hashSync('password', 12) },
        {
          username: 'literarydreamr',
          password: bcrypt.hashSync('password', 12)
        },
        { username: 'bookishbookr', password: bcrypt.hashSync('password', 12) },
        { username: 'eruditeR', password: bcrypt.hashSync('password', 12) }
      ]);
    });
};
