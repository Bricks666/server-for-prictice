import "dotenv/config";
import express, { json } from "express";
import {
	DB_HOST,
	DB_NAME,
	DB_PORT,
	HOST,
	PASSWORD,
	PORT,
	USER,
} from "./consts";
import cors from "cors";
import cookieParser from "cookie-parser";
import { appRouter } from "./routes";
import { createConnection } from "mariadb-table-wrapper";
import { TodosT } from "./database";

const app = express();

app.use(json(), cors(), cookieParser());
app.use("/api/", appRouter);

app.listen(PORT, HOST, async () => {
	const connection = await createConnection({
		user: USER,
		password: PASSWORD,
		host: DB_HOST,
		port: +DB_PORT,
		initSql: [`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`, `use ${DB_NAME}`],
	});

	await TodosT.init(connection);
});
