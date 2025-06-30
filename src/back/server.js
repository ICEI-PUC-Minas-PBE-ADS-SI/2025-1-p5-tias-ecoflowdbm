require('dotenv').config();

const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const { createTables } = require("./models/tables");
const allRoutes = require("./routes");
const { PORT } = require("./utils/constants");

const app = express();

// Configuração do CORS usando variável do .env para frontend permitido
app.use(cors({
  origin: process.env.FRONTEND_URL, 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
}));

app.use(express.json());

// Conecta ao banco e cria as tabelas, se não existirem
db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar no banco:", err);
    return;
  }
  console.log("Conectado ao MySQL!");
  createTables(db);
});

// Rotas prefixadas com /api
app.use("/api", allRoutes);

// Inicia o servidor na porta do .env (PORT)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Valor por garrafa: R$ ${require('./utils/constants').VALOR_POR_GARRAFA}`);
});
