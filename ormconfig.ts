

module.exports = {
    name: 'default',
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrations: [`./src/shared/database/migrations/*{.js,.ts}`],
    entities: [`./src/modules/**/model/*{.js,.ts}`],
    cli: {
      migrationsDir: `./src/shared/database/migrations`,
    },
}