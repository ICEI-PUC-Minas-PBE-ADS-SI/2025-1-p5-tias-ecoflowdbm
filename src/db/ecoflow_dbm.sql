CREATE DATABASE IF NOT EXISTS ecoflow_dbm;
USE ecoflow_dbm;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'cliente',
  saldo DECIMAL(10, 2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de coletas
CREATE TABLE IF NOT EXISTS coletas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  cliente VARCHAR(255),
  quantidade INT NOT NULL,
  data DATE NOT NULL,
  concluida BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela de recompensas/resgates
CREATE TABLE IF NOT EXISTS recompensas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  data_resgate DATETIME DEFAULT CURRENT_TIMESTAMP,
  nome_completo VARCHAR(255) NOT NULL,
  chave_pix VARCHAR(255) NOT NULL,
  status ENUM('pendente', 'processado', 'cancelado') DEFAULT 'pendente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Nova tabela de transações para auditoria
CREATE TABLE IF NOT EXISTS transacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  tipo ENUM('credito', 'debito') NOT NULL,
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
);

-- Índices para melhor performance (removido índice duplicado em email)
CREATE INDEX idx_coletas_usuario ON coletas(usuario_id);
CREATE INDEX idx_coletas_data ON coletas(data);
CREATE INDEX idx_recompensas_usuario ON recompensas(usuario_id);
CREATE INDEX idx_recompensas_status ON recompensas(status);
CREATE INDEX idx_transacoes_usuario ON transacoes(usuario_id);
CREATE INDEX idx_transacoes_tipo ON transacoes(tipo);
CREATE INDEX idx_transacoes_data ON transacoes(created_at);

-- Constraints para garantir valores válidos
ALTER TABLE usuarios ADD CONSTRAINT chk_saldo_positivo CHECK (saldo >= 0);
ALTER TABLE coletas ADD CONSTRAINT chk_quantidade_positiva CHECK (quantidade > 0);
ALTER TABLE recompensas ADD CONSTRAINT chk_valor_positivo CHECK (valor > 0);
ALTER TABLE transacoes ADD CONSTRAINT chk_valor_transacao_positivo CHECK (valor > 0);

-- Triggers para atualizar campo updated_at automaticamente
DROP TRIGGER IF EXISTS tr_usuarios_updated_at;
DELIMITER $$
CREATE TRIGGER tr_usuarios_updated_at
BEFORE UPDATE ON usuarios
FOR EACH ROW
BEGIN
  SET NEW.updated_at = CURRENT_TIMESTAMP;
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS tr_coletas_updated_at;
DELIMITER $$
CREATE TRIGGER tr_coletas_updated_at
BEFORE UPDATE ON coletas
FOR EACH ROW
BEGIN
  SET NEW.updated_at = CURRENT_TIMESTAMP;
END$$
DELIMITER ;

DROP TRIGGER IF EXISTS tr_recompensas_updated_at;
DELIMITER $$
CREATE TRIGGER tr_recompensas_updated_at
BEFORE UPDATE ON recompensas
FOR EACH ROW
BEGIN
  SET NEW.updated_at = CURRENT_TIMESTAMP;
END$$
DELIMITER ;

-- Views para relatórios
CREATE OR REPLACE VIEW vw_saldo_usuarios AS
SELECT 
  u.id,
  u.nome,
  u.email,
  u.saldo,
  COUNT(c.id) as total_coletas,
  COALESCE(SUM(c.quantidade), 0) as total_garrafas,
  COUNT(r.id) as total_resgates,
  COALESCE(SUM(r.valor), 0) as total_resgatado
FROM usuarios u
LEFT JOIN coletas c ON u.id = c.usuario_id
LEFT JOIN recompensas r ON u.id = r.usuario_id
GROUP BY u.id, u.nome, u.email, u.saldo;

CREATE OR REPLACE VIEW vw_historico_transacoes AS
SELECT 
  t.id,
  t.usuario_id,
  u.nome as usuario_nome,
  t.tipo,
  t.valor,
  t.descricao,
  t.saldo_anterior,
  t.saldo_posterior,
  t.created_at,
  c.cliente as coleta_cliente,
  c.quantidade as coleta_quantidade,
  r.nome_completo as resgate_nome,
  r.chave_pix as resgate_pix
FROM transacoes t
JOIN usuarios u ON t.usuario_id = u.id
LEFT JOIN coletas c ON t.coleta_id = c.id
LEFT JOIN recompensas r ON t.recompensa_id = r.id
ORDER BY t.created_at DESC;
