const mysql = require("mysql2");
require('dotenv').config();

// Heroku ClearDB geralmente fornece uma URL de conexão
const dbUrl = process.env.CLEARDB_DATABASE_URL || process.env.DATABASE_URL;

let dbConfig;

if (dbUrl) {
    // Se estiver no Heroku e tiver uma URL de banco de dados
    const url = new URL(dbUrl);
    dbConfig = {
        host: url.hostname,
        user: url.username,
        password: url.password,
        database: url.pathname.substring(1), // Remove o '/' inicial
        port: url.port || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };
    console.log("Usando configuração de banco de dados do Heroku.");
} else {
    // Configuração local (do .env)
    dbConfig = {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "ecoflow_dbm",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };
    console.log("Usando configuração de banco de dados local.");
}

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
