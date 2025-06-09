const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = 'seusecretjwt123456';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@rr232323',
  database: 'ecoflow_dbm',
});

db.connect((err) => {
  if (err) {
    console.log('Erro ao conectar no banco:', err);
    return;
  }
  console.log('Conectado ao MySQL!');

  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      senha VARCHAR(255)
    )
  `;
  db.query(createUsersTable);

  const createColetasTable = `
    CREATE TABLE IF NOT EXISTS coletas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_id INT,
      cliente VARCHAR(255),
      quantidade INT,
      data DATE,
      concluida BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    )
  `;
  db.query(createColetasTable);
});

// Middleware para autenticação
function verificarToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Token não fornecido.' });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido.' });
    req.usuarioId = decoded.id;
    next();
  });
}

// Rota de cadastro
app.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  try {
    const [rows] = await db.promise().query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    const hashSenha = await bcrypt.hash(senha, 10);
    await db.promise().query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hashSenha]);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  try {
    const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Email ou senha incorretos!' });
    }
    const usuario = rows[0];

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ message: 'Email ou senha incorretos!' });
    }

    const token = jwt.sign({ id: usuario.id }, SECRET, { expiresIn: '1d' });

    res.json({
      message: 'Login realizado com sucesso!',
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// Rota para cadastrar coleta
app.post('/coleta', verificarToken, async (req, res) => {
  const { usuario_id, cliente, quantidade, data } = req.body;
  if (!usuario_id || !quantidade || !data) {
    return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
  }

  // Só permite cadastrar para o usuário autenticado
  if (usuario_id !== req.usuarioId) {
    return res.status(403).json({ message: 'Usuário não autorizado.' });
  }

  try {
    await db.promise().query(
      'INSERT INTO coletas (usuario_id, cliente, quantidade, data, concluida) VALUES (?, ?, ?, ?, ?)',
      [usuario_id, cliente || 'N/D', quantidade, data, false]
    );
    res.status(201).json({ message: 'Coleta cadastrada com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// Rota para buscar coletas em andamento (não concluídas) do usuário
app.get('/coletas/em-andamento/:usuario_id', verificarToken, async (req, res) => {
  const usuario_id = parseInt(req.params.usuario_id);
  if (usuario_id !== req.usuarioId) {
    return res.status(403).json({ message: 'Usuário não autorizado.' });
  }

  try {
    const [rows] = await db.promise().query(
      'SELECT id, cliente, quantidade, data FROM coletas WHERE usuario_id = ? AND concluida = false ORDER BY data DESC',
      [usuario_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// Rota para buscar uma coleta pelo id (para edição)
app.get('/coleta/:id', verificarToken, async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const [rows] = await db.promise().query('SELECT * FROM coletas WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Coleta não encontrada.' });
    }

    const coleta = rows[0];
    if (coleta.usuario_id !== req.usuarioId) {
      return res.status(403).json({ message: 'Usuário não autorizado.' });
    }

    res.json(coleta);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// Rota para editar coleta
app.put('/coleta/:id', verificarToken, async (req, res) => {
  const id = parseInt(req.params.id);
  const { cliente, quantidade, data } = req.body;

  try {
    const [rows] = await db.promise().query('SELECT * FROM coletas WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Coleta não encontrada.' });
    }
    const coleta = rows[0];
    if (coleta.usuario_id !== req.usuarioId) {
      return res.status(403).json({ message: 'Usuário não autorizado.' });
    }

    await db.promise().query(
      'UPDATE coletas SET cliente = ?, quantidade = ?, data = ? WHERE id = ?',
      [cliente || 'N/D', quantidade, data, id]
    );
    res.json({ message: 'Coleta atualizada com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// Rota para excluir coleta
app.delete('/coleta/:id', verificarToken, async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const [rows] = await db.promise().query('SELECT * FROM coletas WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Coleta não encontrada.' });
    }
    const coleta = rows[0];
    if (coleta.usuario_id !== req.usuarioId) {
      return res.status(403).json({ message: 'Usuário não autorizado.' });
    }

    await db.promise().query('DELETE FROM coletas WHERE id = ?', [id]);
    res.json({ message: 'Coleta excluída com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// Rota para histórico de coletas (finalizadas ou todas)
app.get('/historico/:usuario_id', verificarToken, async (req, res) => {
  const usuario_id = parseInt(req.params.usuario_id);
  if (usuario_id !== req.usuarioId) {
    return res.status(403).json({ message: 'Usuário não autorizado.' });
  }

  try {
    const [rows] = await db.promise().query(
      'SELECT cliente, quantidade, data FROM coletas WHERE usuario_id = ? ORDER BY data DESC',
      [usuario_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
