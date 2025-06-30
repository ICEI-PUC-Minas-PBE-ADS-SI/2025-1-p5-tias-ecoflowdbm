const mysql = require("mysql2");
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "ecoflow_dbm",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: process.env.DB_PORT || 3306,  // Inclui a porta para o Azure, se precisar
};

console.log("Configuração do banco usada:", dbConfig.host);

const db = mysql.createPool(dbConfig);

db.getConnection((err, connection) => {
  if (err) {
    console.error("Erro ao conectar no pool de banco de dados:", err);
    return;
  }
  console.log("Conectado ao pool de MySQL com sucesso!");
  connection.release();
});

module.exports = db;
