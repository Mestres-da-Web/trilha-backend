const path = process.env.API_MODE == 'DEV' ? 'src' : 'dist';

module.exports = {
  name: 'default',
  type: 'postgres',
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: [`./src/shared/database/migrations/*{.js,.ts}`],
  entities: [`./src/modules/**/model/*{.js,.ts}`],
  seeds: [`./src/shared/database/seeds/*{.js,.ts}`],
  cli: {
    migrationsDir: `./src/shared/database/migrations`,
  },
};
