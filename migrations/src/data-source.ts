import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    dropSchema: false,
    migrationsRun: false,
    entities: [__dirname + '/entities/**/*.{ts,js}'],
    migrations: [`${__dirname}/migrations/*.{ts,js}`],
    extra: {
        charset: 'utf8mb4_unicode_ci',
    },
    subscribers: [],
})
