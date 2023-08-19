const path = process.env.API_MODE == "DEV"? "src" : "dist";

module.exports = {
    name: 'default',
    type: 'postgres',
    port:  process.env.DB_PORT,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrations: [`./${path}/shared/database/migrations/*{.js,.ts}`],
    entities: [`./${path}/modules/**/model/*{.js,.ts}`],
    cli: {
      migrationsDir: `./${path}/shared/database/migrations`,
    },
}