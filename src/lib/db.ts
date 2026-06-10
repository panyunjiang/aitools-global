import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 4000,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "aitools_global",
  waitForConnections: true,
  connectionLimit: 10,
  dateStrings: true,
  ssl: process.env.DB_SSL === "true" ? {} : undefined,
});

export default pool;
