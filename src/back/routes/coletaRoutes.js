const express = require("express");
const db = require("../config/db");
const verificarToken = require("../middlewares/auth");
const { VALOR_POR_GARRAFA } = require("../utils/constants");

const router = express.Router();

// Rota para cadastrar coleta (sempre como pendente)
router.post("/", verificarToken, (req, res) => {
  const { cliente, endereco, quantidade, data } = req.body;
  const usuario_id = req.userId;

  console.log("DEBUG - Cadastro de Coleta: Data recebida no backend:", data); // teste
  console.log("DEBUG - Cadastro de Coleta: Tipo da data recebida:", typeof data); // teste

  if (!cliente || !endereco || !quantidade || !data) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  if (quantidade <= 0) {
    return res.status(400).json({ message: "Quantidade deve ser maior que zero" });
  }

  const valor = quantidade * VALOR_POR_GARRAFA;

  try {
    db.query(
      "INSERT INTO coletas (usuario_id, cliente, endereco, quantidade, data, status, valor) VALUES (?, ?, ?, ?, ?, 'pendente', ?)",
      [usuario_id, cliente, endereco, quantidade, data, valor],
      (err, result) => {
        if (err) {
          console.log("Erro ao cadastrar coleta:", err);
          return res.status(500).json({ message: "Erro ao cadastrar coleta" });
        }

        res.status(201).json({
          message: "Coleta cadastrada com sucesso! Aguardando aprovação.",
          coleta_id: result.insertId,
          status: "pendente",
          valor_estimado: valor
        });
      }
    );
  } catch (error) {
    console.log("Erro ao processar coleta:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Rota para listar coletas pendentes (Acompanhar Coleta)
router.get("/pendentes", verificarToken, (req, res) => {
  const usuario_id = req.userId;

  db.query(
    "SELECT * FROM coletas WHERE usuario_id = ? AND status IN ('pendente', 'aprovada') ORDER BY created_at DESC",
    [usuario_id],
    (err, results) => {
      if (err) {
        console.log("Erro ao buscar coletas pendentes:", err);
        return res.status(500).json({ message: "Erro ao buscar coletas" });
      }
      res.json(results);
    }
  );
});

// Rota para listar todas as coletas para gerenciamento (pendentes e aprovadas)
router.get("/gerenciar", verificarToken, (req, res) => {
  const usuario_id = req.userId;

  db.query(
    "SELECT * FROM coletas WHERE usuario_id = ? AND status IN ('pendente', 'aprovada') ORDER BY created_at DESC",
    [usuario_id],
    (err, results) => {
      if (err) {
        console.log("Erro ao buscar coletas para gerenciar:", err);
        return res.status(500).json({ message: "Erro ao buscar coletas" });
      }
      res.json(results);
    }
  );
});

// Rota para listar coletas aprovadas (mantida para compatibilidade)
router.get("/aprovadas", verificarToken, (req, res) => {
  const usuario_id = req.userId;

  db.query(
    "SELECT * FROM coletas WHERE usuario_id = ? AND status = 'aprovada' ORDER BY created_at DESC",
    [usuario_id],
    (err, results) => {
      if (err) {
        console.log("Erro ao buscar coletas aprovadas:", err);
        return res.status(500).json({ message: "Erro ao buscar coletas" });
      }
      res.json(results);
    }
  );
});

// Rota para listar coletas concluídas (Histórico)
router.get("/historico", verificarToken, (req, res) => {
  const usuario_id = req.userId;

  db.query(
    "SELECT * FROM coletas WHERE usuario_id = ? AND status = 'concluida' ORDER BY updated_at DESC",
    [usuario_id],
    (err, results) => {
      if (err) {
        console.log("Erro ao buscar histórico:", err);
        return res.status(500).json({ message: "Erro ao buscar histórico" });
      }
      res.json(results);
    }
  );
});

// Rota para aprovar coleta (simula aprovação do administrador)
router.put("/:id/aprovar", verificarToken, (req, res) => {
  const coletaId = req.params.id;
  const usuario_id = req.userId;

  db.query(
    "UPDATE coletas SET status = 'aprovada' WHERE id = ? AND usuario_id = ? AND status = 'pendente'",
    [coletaId, usuario_id],
    (err, result) => {
      if (err) {
        console.log("Erro ao aprovar coleta:", err);
        return res.status(500).json({ message: "Erro ao aprovar coleta" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Coleta não encontrada ou já processada" });
      }

      res.json({ message: "Coleta aprovada com sucesso!" });
    }
  );
});

// Rota para editar coleta
router.put("/:id", verificarToken, (req, res) => {
  const coletaId = req.params.id;
  const usuario_id = req.userId;
  const { cliente, endereco, quantidade, data } = req.body;

  console.log("DEBUG - Edição de Coleta: Data recebida no backend:", data); // teste
  console.log("DEBUG - Edição de Coleta: Tipo da data recebida:", typeof data); // teste

  if (!cliente || !endereco || !quantidade || !data) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  if (quantidade <= 0) {
    return res.status(400).json({ message: "Quantidade deve ser maior que zero" });
  }

  const valor = quantidade * VALOR_POR_GARRAFA;

  db.query(
    "UPDATE coletas SET cliente = ?, endereco = ?, quantidade = ?, data = ?, valor = ? WHERE id = ? AND usuario_id = ? AND status IN ('pendente', 'aprovada')",
    [cliente, endereco, quantidade, data, valor, coletaId, usuario_id],
    (err, result) => {
      if (err) {
        console.log("Erro ao editar coleta:", err);
        return res.status(500).json({ message: "Erro ao editar coleta" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Coleta não encontrada ou não pode ser editada" });
      }

      res.json({ message: "Coleta editada com sucesso!" });
    }
  );
});

// Rota para excluir coleta
router.delete("/:id", verificarToken, (req, res) => {
  const coletaId = req.params.id;
  const usuario_id = req.userId;

  db.query(
    "DELETE FROM coletas WHERE id = ? AND usuario_id = ? AND status IN ('pendente', 'aprovada')",
    [coletaId, usuario_id],
    (err, result) => {
      if (err) {
        console.log("Erro ao excluir coleta:", err);
        return res.status(500).json({ message: "Erro ao excluir coleta" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Coleta não encontrada ou não pode ser excluída" });
      }

      res.json({ message: "Coleta excluída com sucesso!" });
    }
  );
});

// Rota para concluir coleta (credita saldo)
router.put("/:id/concluir", verificarToken, (req, res) => {
  const coletaId = req.params.id;
  const usuario_id = req.userId;

  db.beginTransaction((err) => {
    if (err) {
      console.log("Erro ao iniciar transação:", err);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }

    // Buscar dados da coleta
    db.query(
      "SELECT * FROM coletas WHERE id = ? AND usuario_id = ? AND status = 'aprovada'",
      [coletaId, usuario_id],
      (err, coletaResults) => {
        if (err) {
          return db.rollback(() => {
            console.log("Erro ao buscar coleta:", err);
            res.status(500).json({ message: "Erro ao buscar coleta" });
          });
        }

        if (coletaResults.length === 0) {
          return db.rollback(() => {
            res.status(404).json({ message: "Coleta não encontrada ou não aprovada" });
          });
        }

        const coleta = coletaResults[0];
        const valorCredito = coleta.valor;

        // Buscar saldo atual do usuário
        db.query(
          "SELECT saldo FROM usuarios WHERE id = ?",
          [usuario_id],
          (err, userResults) => {
            if (err) {
              return db.rollback(() => {
                console.log("Erro ao buscar usuário:", err);
                res.status(500).json({ message: "Erro ao buscar usuário" });
              });
            }

            const saldoAnterior = userResults[0].saldo;
            const novoSaldo = parseFloat(saldoAnterior) + parseFloat(valorCredito);

            // Atualizar status da coleta
            db.query(
              "UPDATE coletas SET status = 'concluida' WHERE id = ?",
              [coletaId],
              (err) => {
                if (err) {
                  return db.rollback(() => {
                    console.log("Erro ao atualizar coleta:", err);
                    res.status(500).json({ message: "Erro ao atualizar coleta" });
                  });
                }

                // Atualizar saldo do usuário
                db.query(
                  "UPDATE usuarios SET saldo = ? WHERE id = ?",
                  [novoSaldo, usuario_id],
                  (err) => {
                    if (err) {
                      return db.rollback(() => {
                        console.log("Erro ao atualizar saldo:", err);
                        res.status(500).json({ message: "Erro ao atualizar saldo" });
                      });
                    }

                    // Registrar transação
                    db.query(
                      "INSERT INTO transacoes (usuario_id, tipo, valor, descricao, coleta_id, saldo_anterior, saldo_posterior) VALUES (?, 'credito', ?, ?, ?, ?, ?)",
                      [usuario_id, valorCredito, `Coleta concluída - ${coleta.cliente}`, coletaId, saldoAnterior, novoSaldo],
                      (err) => {
                        if (err) {
                          return db.rollback(() => {
                            console.log("Erro ao registrar transação:", err);
                            res.status(500).json({ message: "Erro ao registrar transação" });
                          });
                        }

                        db.commit((err) => {
                          if (err) {
                            return db.rollback(() => {
                              console.log("Erro ao confirmar transação:", err);
                              res.status(500).json({ message: "Erro ao confirmar transação" });
                            });
                          }

                          res.json({
                            message: "Coleta concluída com sucesso!",
                            valor_creditado: valorCredito,
                            novo_saldo: novoSaldo
                          });
                        });
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});

module.exports = router;