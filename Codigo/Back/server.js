
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rr232323',
    database: 'ecoflow_dbm'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no banco:', err);
        return;
    }
    console.log('Conectado ao banco MySQL');

    const sqlUsuarios = `CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        senha VARCHAR(100) NOT NULL
    )`;

    const sqlColetas = `CREATE TABLE IF NOT EXISTS coletas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        cliente VARCHAR(100) NOT NULL,
        data DATE NOT NULL,
        quantidade INT NOT NULL,
        usuario_id INT,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )`;

    db.query(sqlUsuarios);
    db.query(sqlColetas);
});

app.post('/api/usuarios', (req, res) => {
    const { nome, email, senha } = req.body;
    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, senha], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ id: result.insertId, nome, email });
    });
});

app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;
    const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    db.query(sql, [email, senha], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(401).json({ error: 'Email ou senha inválidos' });
        }
    });
});

app.post('/api/coletas', (req, res) => {
    const { cliente, data, quantidade, usuario_id } = req.body;
    const sql = 'INSERT INTO coletas (cliente, data, quantidade, usuario_id) VALUES (?, ?, ?, ?)';
    db.query(sql, [cliente, data, quantidade, usuario_id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ id: result.insertId, cliente, data, quantidade, usuario_id });
    });
});

app.get('/api/coletas/:usuario_id', (req, res) => {
    const usuario_id = req.params.usuario_id;
    const sql = 'SELECT * FROM coletas WHERE usuario_id = ?';
    db.query(sql, [usuario_id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

app.delete('/api/coletas/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM coletas WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Coleta excluída' });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
