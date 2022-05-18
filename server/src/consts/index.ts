export const PORT = (process.env.PORT as number | undefined) || 5000;
export const HOST = process.env.HOST || "localhost";
export const USER = process.env.DB_USER || "root";
export const PASSWORD = process.env.DB_PASSWORD || "";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_NAME = process.env.DB_NAME || "Todos";
