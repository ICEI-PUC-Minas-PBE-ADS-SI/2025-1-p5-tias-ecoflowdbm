const VALOR_POR_GARRAFA = 0.85;

async function cadastrar() {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const res = await fetch('http://localhost:3000/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha }),
    });
    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      window.location.href = 'acessar.html';
    } else {
      alert(data.message || 'Erro no cadastro');
    }
  } catch (error) {
    alert('Erro ao conectar com o servidor');
  }
}

async function fazerLogin() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuarioLogado', JSON.stringify(data.usuario));
      alert(data.message);
      window.location.href = 'home.html';
    } else {
      alert(data.message || 'Email ou senha incorretos!');
    }
  } catch {
    alert('Erro ao conectar com o servidor');
  }
}

function sair() {
  localStorage.removeItem('usuarioLogado');
  localStorage.removeItem('token');
  window.location.href = 'acessar.html';
}

async function adicionarColeta() {
  const cliente = document.getElementById('cliente').value;
  const data = document.getElementById('data').value;
  const quantidade = document.getElementById('quantidade').value;

  if (!cliente || !data || !quantidade) {
    alert('Preencha todos os campos.');
    return;
  }

  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Usuário não autenticado.');
    window.location.href = 'acessar.html';
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/coleta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        usuario_id: usuarioLogado.id,
        cliente,
        quantidade: Number(quantidade),
        data,
      }),
    });
    const dataRes = await res.json();
    if (res.ok) {
      alert(dataRes.message);
      carregarColetas();
      document.getElementById('cliente').value = '';
      document.getElementById('data').value = '';
      document.getElementById('quantidade').value = '';
    } else {
      alert(dataRes.message || 'Erro ao cadastrar coleta');
    }
  } catch {
    alert('Erro ao conectar com o servidor');
  }
}

async function carregarColetas() {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Usuário não autenticado.');
    window.location.href = 'acessar.html';
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/coletas/em-andamento/${usuarioLogado.id}`, {
      headers: { Authorization: token },
    });
    if (!res.ok) throw new Error('Erro ao buscar coletas');
    const coletas = await res.json();

    const lista = document.getElementById('lista-coletas');
    lista.innerHTML = '';

    if (coletas.length === 0) {
      lista.innerHTML = '<p>Não há coletas cadastradas.</p>';
      return;
    }

    coletas.forEach((coleta) => {
      const item = document.createElement('div');
      item.className = 'item-coleta';
      item.innerHTML = `
        <p><strong>Cliente:</strong> ${coleta.cliente || 'N/D'}</p>
        <p><strong>Data:</strong> ${coleta.data}</p>
        <p><strong>Quantidade:</strong> ${coleta.quantidade}</p>
        <button onclick="editarColeta(${coleta.id})">Editar</button>
        <button onclick="excluirColeta(${coleta.id})">Excluir</button>
      `;
      lista.appendChild(item);
    });
  } catch {
    alert('Erro ao conectar com o servidor');
  }
}

async function excluirColeta(id) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Usuário não autenticado.');
    window.location.href = 'acessar.html';
    return;
  }

  if (!confirm('Deseja realmente excluir essa coleta?')) return;

  try {
    const res = await fetch(`http://localhost:3000/coleta/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token },
    });
    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      carregarColetas();
    } else {
      alert(data.message || 'Erro ao excluir coleta');
    }
  } catch {
    alert('Erro ao conectar com o servidor');
  }
}

async function editarColeta(id) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Usuário não autenticado.');
    window.location.href = 'acessar.html';
    return;
  }

  try {
    const resGet = await fetch(`http://localhost:3000/coleta/${id}`, { headers: { Authorization: token } });
    if (!resGet.ok) throw new Error('Erro ao buscar coleta');
    const coleta = await resGet.json();

    const novoCliente = prompt('Editar nome do cliente:', coleta.cliente || '');
    const novaData = prompt('Editar data (YYYY-MM-DD):', coleta.data);
    const novaQuantidade = prompt('Editar quantidade:', coleta.quantidade);

    if (!novoCliente || !novaData || !novaQuantidade) {
      alert('Preencha todos os campos.');
      return;
    }

    const resPut = await fetch(`http://localhost:3000/coleta/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify({ cliente: novoCliente, data: novaData, quantidade: Number(novaQuantidade) }),
    });

    const dataPut = await resPut.json();

    if (resPut.ok) {
      alert(dataPut.message);
      carregarColetas();
    } else {
      alert(dataPut.message || 'Erro ao atualizar coleta');
    }
  } catch {
    alert('Erro ao conectar com o servidor');
  }
}

async function carregarRelatorio() {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Usuário não autenticado.');
    window.location.href = 'acessar.html';
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/historico/${usuarioLogado.id}`, {
      headers: { Authorization: token },
    });
    if (!res.ok) throw new Error('Erro ao buscar relatório');
    const coletas = await res.json();

    const tbody = document.querySelector('#tabela-relatorio tbody');
    tbody.innerHTML = '';

    if (coletas.length === 0) {
      const tr = document.createElement('tr');
      tr.innerHTML = '<td colspan="4" style="text-align:center;">Nenhuma coleta registrada.</td>';
      tbody.appendChild(tr);
      return;
    }

    coletas.forEach((coleta) => {
      const valor = (coleta.quantidade * VALOR_POR_GARRAFA).toFixed(2).replace('.', ',');
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${coleta.cliente || 'N/D'}</td>
        <td>${coleta.data}</td>
        <td>${coleta.quantidade}</td>
        <td>${valor}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch {
    alert('Erro ao conectar com o servidor');
  }
}
