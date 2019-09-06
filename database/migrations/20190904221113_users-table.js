exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    user.increments();
    users
      .string('username', 128)
      .notNullable()
      .unique();
    user.string('password', 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
