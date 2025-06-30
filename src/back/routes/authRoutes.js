const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { SECRET } = require("../utils/constants");

const router = express.Router();

// Rota de cadastro
router.post("/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    
    db.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, hashedPassword],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ message: "Email já cadastrado" });
          }
          console.log("Erro ao cadastrar usuário:", err);
          return res.status(500).json({ message: "Erro interno do servidor" });
        }
        res.status(201).json({ message: "Usuário cadastrado com sucesso" });
      }
    );
  } catch (error) {
    console.log("Erro ao processar cadastro:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Rota de login
router.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, results) => {
    if (err) {
      console.log("Erro ao buscar usuário:", err);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const user = results[0];
    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "24h" });

    res.json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        saldo: user.saldo
      }
    });
  });
});

module.exports = router;