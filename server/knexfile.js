require('dotenv').config({ path: '../.env' });

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: ['knex', 'public'],
  useNullAsDefault: true,
  migrations: {
    tableName: 'dbmigrations',
    directory: './database/migrations',
  },
  seeds: {
    directory: './database/seeds',
  },
  ssl: true,
  debug: true
};