const express = require("express");
const db = require("../config/db");
const verificarToken = require("../middlewares/auth");
const bcrypt = require("bcryptjs"); // <-- Adicionar esta linha para bcrypt

const router = express.Router();

// Rota para obter saldo do usuário
router.get("/saldo", verificarToken, (req, res) => {
  const usuario_id = req.userId;

  db.query("SELECT saldo FROM usuarios WHERE id = ?", [usuario_id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar saldo:", err); // Ajustado para console.error
      return res.status(500).json({ message: "Erro ao buscar saldo" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    const saldo = results[0].saldo;
    console.log(`Saldo consultado para usuário ${usuario_id}: R$ ${saldo}`);
    res.json({ saldo: parseFloat(saldo) });
  });
});

// Rota para resgatar recompensa
router.post("/recompensa", verificarToken, (req, res) => {
  const { valor, nome_completo, chave_pix } = req.body;
  const usuario_id = req.userId;

  if (!valor || !nome_completo || !chave_pix) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }
  if (valor <= 0) {
    return res.status(400).json({ message: "Valor deve ser maior que zero" });
  }

  db.beginTransaction((err) => {
    if (err) {
      console.error("Erro ao iniciar transação para recompensa:", err); // Ajustado para console.error
      return res.status(500).json({ message: "Erro interno do servidor" });
    }

    db.query("SELECT saldo FROM usuarios WHERE id = ?", [usuario_id], (err, results) => {
      if (err) {
        return db.rollback(() => {
          console.error("Erro ao verificar saldo para recompensa:", err);
          res.status(500).json({ message: "Erro ao verificar saldo" });
        });
      }
      if (results.length === 0) { // Se o usuário não for encontrado (embora o token já o autentique)
          return db.rollback(() => {
              res.status(404).json({ message: "Usuário não encontrado." });
          });
      }
      const saldoAtual = parseFloat(results[0].saldo);

      if (saldoAtual < valor) {
        return db.rollback(() => {
          res.status(400).json({ message: "Saldo insuficiente" });
        });
      }

      const novoSaldo = saldoAtual - valor;

      db.query(
        "INSERT INTO recompensas (usuario_id, valor, nome_completo, chave_pix, status) VALUES (?, ?, ?, ?, \"pendente\")",
        [usuario_id, valor, nome_completo, chave_pix],
        (err, recompensaResult) => {
          if (err) {
            return db.rollback(() => {
              console.error("Erro ao registrar recompensa:", err);
              res.status(500).json({ message: "Erro ao registrar recompensa" });
            });
          }

          db.query(
            "UPDATE usuarios SET saldo = ? WHERE id = ?",
            [novoSaldo, usuario_id],
            (err) => {
              if (err) {
                return db.rollback(() => {
                  console.error("Erro ao atualizar saldo para recompensa:", err);
                  res.status(500).json({ message: "Erro ao atualizar saldo" });
                });
              }

              db.query(
                "INSERT INTO transacoes (usuario_id, tipo, valor, descricao, recompensa_id, saldo_anterior, saldo_posterior) VALUES (?, 'debito', ?, ?, ?, ?, ?)",
                [usuario_id, valor, "Resgate de recompensa", recompensaResult.insertId, saldoAtual, novoSaldo],
                (err) => {
                  if (err) {
                    return db.rollback(() => {
                      console.error("Erro ao registrar transação para recompensa:", err);
                      res.status(500).json({ message: "Erro ao registrar transação" });
                    });
                  }

                  db.commit((err) => {
                    if (err) {
                      return db.rollback(() => {
                        console.error("Erro ao confirmar transação para recompensa:", err);
                        res.status(500).json({ message: "Erro ao confirmar transação" });
                      });
                    }
                    res.status(201).json({ message: "Recompensa solicitada com sucesso!", novo_saldo: novoSaldo });
                  });
                }
              );
            }
          );
        }
      );
    });
  });
});

// NOVA ROTA: Rota para alterar senha
router.put("/senha", verificarToken, async (req, res) => {
    const usuario_id = req.userId;
    const { senha_atual, nova_senha } = req.body;

    if (!senha_atual || !nova_senha) {
        return res.status(400).json({ message: "Preencha todos os campos." });
    }
    if (nova_senha.length < 6) {
        return res.status(400).json({ message: "A nova senha deve ter pelo menos 6 caracteres." });
    }

    try {
        db.query("SELECT senha FROM usuarios WHERE id = ?", [usuario_id], async (err, results) => {
            if (err) {
                console.error("Erro ao buscar senha do usuário para alteração:", err);
                return res.status(500).json({ message: "Erro interno do servidor." });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            const senhaHashAtual = results[0].senha;

            // Compara a senha atual fornecida com a senha hash no banco
            const senhaValida = await bcrypt.compare(senha_atual, senhaHashAtual);
            if (!senhaValida) {
                return res.status(401).json({ message: "Senha atual incorreta." });
            }

            // Hash da nova senha
            const novaSenhaHash = await bcrypt.hash(nova_senha, 10);

            // Atualiza a senha no banco de dados
            db.query("UPDATE usuarios SET senha = ? WHERE id = ?", [novaSenhaHash, usuario_id], (err, result) => {
                if (err) {
                    console.error("Erro ao atualizar senha:", err);
                    return res.status(500).json({ message: "Erro ao atualizar senha." });
                }
                res.json({ message: "Senha alterada com sucesso!" });
            });
        });
    } catch (error) {
        console.error("Erro ao processar alteração de senha:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
});

module.exports = router;