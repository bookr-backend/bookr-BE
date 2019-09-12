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

  pg_test: {
    client: 'pg',
    connection: {
      host : 'localhost',
      database: 'bookr',
      user: 'me',
      password: 'password'
    },
    migrations: {
      directory: './database/migrations'
    },
    useNullAsDefault: true
  },  

  production: {
    client: 'pg',
    useNullAsDefault: true,
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './database/migrations'
    }
  }
};
