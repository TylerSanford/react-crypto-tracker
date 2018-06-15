require('dotenv').config({ path: '../.env' });

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL_DEV,
  searchPath: ['knex', 'public'],
  useNullAsDefault: true,
  migrations: {
    tableName: 'dbmigrations',
    directory: './database/migrations',
  },
  seeds: {
    directory: './database/seeds',
  },
};