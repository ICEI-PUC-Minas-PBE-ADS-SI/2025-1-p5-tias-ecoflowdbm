// backend/utils/constants.js
// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;
const VALOR_POR_GARRAFA = parseFloat(process.env.VALOR_POR_GARRAFA) || 0.85; // Garante que é um número
const PORT = process.env.PORT || 3000;

module.exports = {
  SECRET,
  VALOR_POR_GARRAFA,
  PORT
};