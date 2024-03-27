import { DataSource } from "typeorm";
import * as dotenv from 'dotenv'
dotenv.config()

export default new DataSource({
  type: "postgres",
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ["src/**/*.entity{.ts,.js}"],
    migrations: ["src/migrations/*{.ts,.js}"],
    synchronize: false,
})