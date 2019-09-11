// Update with your config settings.
require('dotenv').config();

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './database/bookr.db3'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    },
    migrations: {
      directory: './database/migrations'
    }
  },

  production: {
    client: 'postgresql',
    useNullAsDefault: true,
    connection: 'postgres://rviquqmgwgkcdb:24f51bb4fd2519d3aa9f159776723746179e37468dadbd47862919d971087553@ec2-23-21-148-223.compute-1.amazonaws.com:5432/d6dibv4mgfpqht',
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    },
    migrations: {
      directory: './database/migrations'
    }
  }
};
