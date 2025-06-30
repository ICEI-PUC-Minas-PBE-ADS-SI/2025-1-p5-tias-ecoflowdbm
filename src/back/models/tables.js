function createTables(db) {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      senha VARCHAR(255),
      role VARCHAR(50) DEFAULT 'cliente',
      saldo DECIMAL(10, 2) DEFAULT 0.00,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.query(createUsersTable, (err) => {
    if (err) console.log("Erro ao criar tabela usuarios:", err);
  });

  const createColetasTable = `
    CREATE TABLE IF NOT EXISTS coletas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_id INT,
      cliente VARCHAR(255),
      endereco VARCHAR(255),
      quantidade INT,
      data DATE,
      status ENUM("pendente", "aprovada", "concluida") DEFAULT "pendente",
      valor DECIMAL(10, 2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    )
  `;
  db.query(createColetasTable, (err) => {
    if (err) console.log("Erro ao criar tabela coletas:", err);
  });

  const createRecompensasTable = `
    CREATE TABLE IF NOT EXISTS recompensas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_id INT,
      valor DECIMAL(10, 2),
      data_resgate DATETIME DEFAULT CURRENT_TIMESTAMP,
      nome_completo VARCHAR(255),
      chave_pix VARCHAR(255),
      status ENUM("pendente", "processado", "cancelado") DEFAULT "pendente",
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    )
  `;
  db.query(createRecompensasTable, (err) => {
    if (err) console.log("Erro ao criar tabela recompensas:", err);
  });

  const createTransacoesTable = `
    CREATE TABLE IF NOT EXISTS transacoes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_id INT,
      tipo ENUM("credito", "debito") NOT NULL,
      valor DECIMAL(10, 2) NOT NULL,
      descricao VARCHAR(255),
      coleta_id INT NULL,
      recompensa_id INT NULL,
      saldo_anterior DECIMAL(10, 2),
      saldo_posterior DECIMAL(10, 2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
      FOREIGN KEY (coleta_id) REFERENCES coletas(id) ON DELETE SET NULL,
      FOREIGN KEY (recompensa_id) REFERENCES recompensas(id) ON DELETE SET NULL
    )
  `;
  db.query(createTransacoesTable, (err) => {
    if (err) console.log("Erro ao criar tabela transacoes:", err);
  });

  // Atualizar tabela coletas existente para incluir status e valor (apenas se não existirem)
  db.query("ALTER TABLE coletas ADD COLUMN status ENUM('pendente', 'aprovada', 'concluida') DEFAULT 'pendente'", (err) => {
    if (err && !err.message.includes('Duplicate column name')) {
      console.log("Erro ao adicionar coluna status:", err);
    }
  });

  db.query("ALTER TABLE coletas ADD COLUMN valor DECIMAL(10, 2)", (err) => {
    if (err && !err.message.includes('Duplicate column name')) {
      console.log("Erro ao adicionar coluna valor:", err);
    }
  });

  db.query("ALTER TABLE coletas ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP", (err) => {
    if (err && !err.message.includes('Duplicate column name')) {
      console.log("Erro ao adicionar coluna updated_at:", err);
    }
  });
}

module.exports = { createTables };