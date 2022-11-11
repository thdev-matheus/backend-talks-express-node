import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";
import { type } from "os";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "migration"
    ? {
        type: "postgres",
        host: "localhost",
        port: 5050,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        logging: true,
        synchronize: false,
        entities: ["src/entities/*.ts"],
        migrations: ["src/migrations/*.ts"],
      }
    : {
        type: "postgres",
        host: process.env.POSTGRES_HOST,
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        logging: true,
        synchronize: false,
        entities: ["src/entities/*.ts"],
        migrations: ["src/migrations/*.ts"],
      }
);

export default AppDataSource;
