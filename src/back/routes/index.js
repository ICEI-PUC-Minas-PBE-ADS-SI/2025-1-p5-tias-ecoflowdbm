const express = require("express");
const authRoutes = require("./authRoutes");
const coletaRoutes = require("./coletaRoutes");
const userSettingsRoutes = require("./userSettingsRoutes");

const router = express.Router();

router.use("/auth", authRoutes); // Ex: /api/auth/cadastro, /api/auth/login
router.use("/coletas", coletaRoutes); // Ex: /api/coletas, /api/coletas/pendentes
router.use("/usuario", userSettingsRoutes); // Ex: /api/usuario/saldo, /api/usuario/recompensa

module.exports = router;