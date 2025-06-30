// backend/server.js
const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const { createTables } = require("./models/tables");
const allRoutes = require("./routes");
const { PORT } = require("./utils/constants"); // PORT já vem de constants

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

const app = express();

// Configuração do CORS
// Restringe o acesso ao seu frontend_URL, definido no .env
app.use(cors({
  origin: process.env.FRONTEND_URL, // Agora usa a variável de ambiente
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
}));

app.use(express.json());

// Conecta ao banco de dados e cria as tabelas se não existirem
db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar no banco:", err);
    return;
  }
  console.log("Conectado ao MySQL!");
  createTables(db); // Chama a função para criar as tabelas
});

// Usa todas as rotas importadas
app.use("/api", allRoutes); // Prefixo '/api' para todas as rotas

// Inicia o servidor
app.listen(PORT, "0.0.0.0", () => { // O .env define a porta
  console.log(`Servidor rodando na porta ${PORT}`);
  // O VALOR_POR_GARRAFA agora é lido de constants, que por sua vez lê do .env
  console.log(`Valor por garrafa: R$ ${require('./utils/constants').VALOR_POR_GARRAFA}`);
});