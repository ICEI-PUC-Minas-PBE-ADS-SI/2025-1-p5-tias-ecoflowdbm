// script.js (ARQUIVO GLOBAL - SUBSTITUA TODO O CONTEÚDO DO SEU SCRIPT.JS POR ESTE)

// Carrega as variáveis de ambiente (necessário apenas para testes locais se rodar o script diretamente)
// Em um ambiente web, não há .env. Este require não terá efeito no browser.
// require('dotenv').config(); // Removido para evitar confusão em ambiente de browser

// ================================
// CONFIGURAÇÃO DA API E CONSTANTES
// ================================
const API_BASE_URL = 'http://localhost:3000/api';
const VALOR_POR_GARRAFA = 0.85;

// ================================
// FUNÇÕES AUXILIARES GLOBAIS (essenciais)
// ================================

// Função para obter token (agora do localStorage)
function getToken() {
  return localStorage.getItem('authToken') || null;
}

// Função para obter dados do usuário logado (agora do localStorage)
function getUsuarioLogado() {
  const userData = localStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) : null;
}

// Função para fazer requisições autenticadas
async function fetchAutenticado(url, options = {}) {
  const token = getToken();
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = token;
  }
  
  const finalOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers, // Permite sobrescrever ou adicionar headers
    }
  };
  
  // console.log(`Fazendo requisição para: ${url}`);
  // console.log('Headers:', finalOptions.headers);
  // if (finalOptions.body) {
  //   console.log('Body:', JSON.parse(finalOptions.body));
  // }

  return fetch(url, finalOptions);
}

// Função para formatar data (para uso em qualquer lugar)
function formatarData(data) {
  if (!data) return ''; // Retorna vazio se a data for nula ou indefinida

  let dateObj;
  // Tenta criar um objeto Date. Se a string já tiver 'T', usa como está.
  // Caso contrário, adiciona 'T00:00:00' para garantir que new Date() a interprete como local/UTC sem problemas.
  try {
    dateObj = new Date(data.includes('T') ? data : data + 'T00:00:00');
  } catch (e) {
    console.error("Erro ao parsear data:", data, e);
    return 'Data Inválida'; // Mensagem para depuração
  }

  if (isNaN(dateObj.getTime())) { // Verifica se a data é inválida após a criação
    return 'Data Inválida';
  }

  // Retorna a data formatada no padrão brasileiro
  return dateObj.toLocaleDateString('pt-BR');
}

// Função para formatar data e hora (para uso em qualquer lugar)
function formatarDataHora(dataHora) {
  return new Date(dataHora).toLocaleString('pt-BR');
}


// ================================
// FUNÇÕES DE NAVEGAÇÃO E AUTENTICAÇÃO (PRINCIPAIS)
// ================================

// Função de cadastro
async function cadastrar() {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email-cadastro').value;
  const senha = document.getElementById('senha-cadastro').value;

  if (!nome || !email || !senha) {
    alert('⚠️ Preencha todos os campos.');
    return;
  }

  if (senha.length < 6) {
    alert('⚠️ A senha deve ter pelo menos 6 caracteres.');
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha }),
    });
    const data = await res.json();

    if (res.ok) {
      alert('✅ ' + data.message);
      window.location.href = 'acessar.html'; // Redireciona para a tela de login
      // O formulário será limpo pela página de origem
    } else {
      alert('❌ ' + (data.message || 'Erro no cadastro'));
    }
  } catch (error) {
    console.error('Erro ao conectar com o servidor:', error);
    alert('❌ Erro ao conectar com o servidor. Verifique se o backend está rodando.');
  }
}

// Função de login
async function fazerLogin() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  if (!email || !senha) {
    alert('⚠️ Preencha todos os campos.');
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });
    const data = await res.json();

    if (res.ok) {
      alert('✅ ' + data.message);
      localStorage.setItem('currentUser', JSON.stringify(data.user)); // Converte objeto para string JSON
      localStorage.setItem('authToken', data.token);
      window.location.href = 'home.html'; // Redireciona para a página principal da aplicação
      // O formulário será limpo pela página de origem
    } else {
      alert('❌ ' + (data.message || 'Email ou senha incorretos!'));
    }
  } catch (error) {
    console.error('Erro ao conectar com o servidor:', error);
    alert('❌ Erro ao conectar com o servidor. Verifique se o backend está rodando.');
  }
}

// Função de logout
function sair() {
  if (confirm('🚪 Tem certeza que deseja sair?')) {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    window.location.href = 'acessar.html'; // Redirecionar para a tela de login
  }
}

// Função para verificar se o usuário está autenticado
function verificarAutenticacao() {
  const usuario = getUsuarioLogado();
  const token = getToken();
  
  // Caminhos das páginas de autenticação (adicionei /frontend/ por causa da sua URL)
  const authPages = ['acessar.html', 'cadastro.html', 'recuperar-senha.html'];
  const currentPage = window.location.pathname.split('/').pop(); // Obtém o nome do arquivo atual

  if (!usuario || !token) {
    if (!authPages.includes(currentPage)) {
        window.location.href = 'acessar.html';
        return false; // Usuário NÃO autenticado
    }
  }
  return true; // Usuário autenticado (ou está em página de autenticação)
}

// ================================
// FUNÇÕES DE MODO ESCURO
// ================================

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
  
  const button = document.querySelector('.dark-mode-toggle');
  if (button) {
      if (body.classList.contains('dark-mode')) {
        button.textContent = '☀️';
      } else {
        button.textContent = '🌙';
      }
  }
}

function initDarkMode() {
  const body = document.body;
  const button = document.querySelector('.dark-mode-toggle');

  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    if (button) button.textContent = '☀️';
  } else {
    body.classList.remove('dark-mode');
    if (button) button.textContent = '🌙';
  }
}


// ================================
// FUNÇÕES DE COLETAS
// ================================

// Função para adicionar coleta
async function adicionarColeta() {
  // A verificação de autenticação para esta função é feita no HTML que a chama,
  // ou assumimos que o usuário já está autenticado para estar nesta página.

  const cliente = document.getElementById('cliente').value;
  const endereco = document.getElementById('endereco').value;
  const data = document.getElementById('data').value;
  const quantidade = document.getElementById('quantidade').value;

  if (!cliente || !endereco || !data || !quantidade) {
    alert('⚠️ Preencha todos os campos.');
    return;
  }

  if (Number(quantidade) <= 0) {
    alert('⚠️ Quantidade deve ser maior que zero.');
    return;
  }

  try {
    const res = await fetchAutenticado(`${API_BASE_URL}/coletas`, { // Rota: /api/coletas (POST)
      method: 'POST',
      body: JSON.stringify({
        cliente,
        endereco,
        quantidade: Number(quantidade),
        data
      }),
    });

    const dataRes = await res.json();

    if (res.ok) {
      const valorEstimado = dataRes.valor_estimado || (Number(quantidade) * VALOR_POR_GARRAFA);

      alert(`✅ Coleta cadastrada com sucesso!
        
📋 Detalhes:
• Cliente: ${cliente}
• Endereço: ${endereco}
• Quantidade: ${quantidade} garrafas
• Valor estimado: R$ ${valorEstimado.toFixed(2).replace('.', ',')}
• Status: Pendente (aguardando aprovação)

🔄 Você pode acompanhar o status na página "Acompanhar Coleta".`);

      // Não limpamos o formulário aqui; isso é responsabilidade do listener no HTML.

    } else {
      alert('❌ ' + (dataRes.message || 'Erro ao cadastrar coleta'));
    }
  } catch (error) {
    console.error('Erro ao conectar com o servidor ao cadastrar coleta:', error);
    alert('❌ Erro ao conectar com o servidor. Verifique sua conexão e tente novamente.');
  }
}

// Função para carregar coletas pendentes (para acompanhar-coleta.html)
async function carregarColetasPendentes() {
  try {
    const res = await fetchAutenticado(`${API_BASE_URL}/coletas/gerenciar`); // Rota: /api/coletas/pendentes (GET)
    const coletas = await res.json();

    const container = document.getElementById('lista-coletas-pendentes');
    if (!container) {
      // console.warn('Elemento #lista-coletas-pendentes não encontrado na página atual.');
      return;
    }

    if (coletas.length === 0) {
      container.innerHTML = `
        <div class="empty-message">
          <h3>📭 Nenhuma coleta pendente</h3>
          <p>Todas as suas coletas foram aprovadas ou você ainda não cadastrou nenhuma coleta.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = coletas.map(coleta => `
      <div class="coleta-card">
        <div class="coleta-header">
          <h3>👤 ${coleta.cliente}</h3>
          <span class="status-badge status-pendente">Pendente</span>
        </div>
        <div class="coleta-details">
          <p><strong>📍 Endereço:</strong> ${coleta.endereco}</p>
          <p><strong>📅 Data:</strong> ${formatarData(coleta.data)}</p>
          <p><strong>🍾 Quantidade:</strong> ${coleta.quantidade} garrafas</p>
          <p><strong>💰 Valor estimado:</strong> R$ ${(parseFloat(coleta.valor) || coleta.quantidade * VALOR_POR_GARRAFA).toFixed(2).replace('.', ',')}</p>
        </div>
        <div class="coleta-info">
          <p><em>⏳ Aguardando aprovação do administrador...</em></p>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Erro ao carregar coletas pendentes:', error);
    const container = document.getElementById('lista-coletas-pendentes');
    if (container) {
      container.innerHTML = `
        <div class="empty-message">
          <h3>❌ Erro ao carregar coletas</h3>
          <p>Não foi possível carregar as coletas pendentes. Tente novamente.</p>
        </div>
      `;
    }
  }
}

// Função para carregar coletas aprovadas/gerenciáveis (para gerenciar-coletas.html)
async function carregarColetasAprovadas() { // O nome da função é "Aprovadas" mas ela carrega "Gerenciar"
  try {
    const res = await fetchAutenticado(`${API_BASE_URL}/coletas/gerenciar`); // Rota: /api/coletas/gerenciar (GET)
    const coletas = await res.json();

    const container = document.getElementById('lista-coletas-aprovadas');
    if (!container) {
      // console.warn('Elemento #lista-coletas-aprovadas não encontrado na página atual.');
      return;
    }

    if (coletas.length === 0) {
      container.innerHTML = `
        <div class="empty-message">
          <h3>📭 Nenhuma coleta para gerenciar</h3>
          <p>Não há coletas pendentes ou aprovadas para gerenciar no momento.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = coletas.map(coleta => {
      const statusClass = coleta.status === 'pendente' ? 'status-pendente' : (coleta.status === 'aprovada' ? 'status-aprovada' : '');
      const statusText = coleta.status === 'pendente' ? 'Pendente' : (coleta.status === 'aprovada' ? 'Aprovada' : '');
      
      let actionButtons = '';
      if (coleta.status === 'pendente') {
        actionButtons = `
          <button class="btn btn-primary" onclick="aprovarColeta(${coleta.id})">✅ Aprovar</button>
          <button class="btn btn-edit" onclick="abrirModalEdicao(${coleta.id})">✏️ Editar</button>
          <button class="btn btn-delete" onclick="excluirColeta(${coleta.id})">🗑️ Excluir</button>
        `;
      } else { // status === 'aprovada'
        actionButtons = `
          <button class="btn btn-edit" onclick="abrirModalEdicao(${coleta.id})">✏️ Editar</button>
          <button class="btn btn-delete" onclick="excluirColeta(${coleta.id})">🗑️ Excluir</button>
          <button class="btn btn-complete" onclick="concluirColeta(${coleta.id})">✅ Concluir</button>
        `;
      }

      return `
        <div class="coleta-card">
          <div class="coleta-header">
            <h3>👤 ${coleta.cliente}</h3>
            <span class="status-badge ${statusClass}">${statusText}</span>
          </div>
          <div class="coleta-details">
            <p><strong>📍 Endereço:</strong> ${coleta.endereco}</p>
            <p><strong>📅 Data:</strong> ${formatarData(coleta.data)}</p>
            <p><strong>🍾 Quantidade:</strong> ${coleta.quantidade} garrafas</p>
            <p><strong>💰 Valor:</strong> R$ ${(parseFloat(coleta.valor) || coleta.quantidade * VALOR_POR_GARRAFA).toFixed(2).replace('.', ',')}</p>
          </div>
          <div class="coleta-actions">
            ${actionButtons}
          </div>
        </div>
      `;
    }).join('');
  } catch (error) {
    console.error('Erro ao carregar coletas para gerenciar:', error);
    const container = document.getElementById('lista-coletas-aprovadas');
    if (container) {
      container.innerHTML = `
        <div class="empty-message">
          <h3>❌ Erro ao carregar coletas</h3>
          <p>Não foi possível carregar as coletas. Tente novamente.</p>
        </div>
      `;
    }
  }
}

// Funções para Aprovar, Excluir, Concluir Coleta (Chamadas pelo HTML)
// Estes devem permanecer no script.js GLOBAL para serem acessíveis a partir do HTML.

async function aprovarColeta(coletaId) {
  if (!confirm('✅ Confirma a aprovação desta coleta? Ela ficará disponível para conclusão.')) {
    return;
  }

  try {
    const res = await fetchAutenticado(`${API_BASE_URL}/coletas/${coletaId}/aprovar`, {
      method: 'PUT',
    });

    if (res.ok) {
      const data = await res.json();
      alert('✅ ' + data.message);
      carregarColetasAprovadas(); // Atualiza a lista de coletas gerenciáveis
      carregarEstatisticas(); // Atualiza estatísticas da home
    } else {
      const data = await res.json();
      alert('❌ ' + (data.message || 'Erro ao aprovar coleta'));
    }
  } catch (error) {
    console.error('Erro ao aprovar coleta:', error);
    alert('❌ Erro ao conectar com o servidor');
  }
}

async function excluirColeta(coletaId) {
  if (!confirm('⚠️ Tem certeza que deseja excluir esta coleta? Esta ação não pode ser desfeita.')) {
    return;
  }

  try {
    const res = await fetchAutenticado(`${API_BASE_URL}/coletas/${coletaId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      alert('✅ Coleta excluída com sucesso!');
      carregarColetasAprovadas(); // Atualiza a lista de coletas gerenciáveis
      carregarEstatisticas(); // Atualiza estatísticas da home
    } else {
      const data = await res.json();
      alert('❌ ' + (data.message || 'Erro ao excluir coleta'));
    }
  } catch (error) {
    console.error('Erro ao excluir coleta:', error);
    alert('❌ Erro ao conectar com o servidor');
  }
}

async function concluirColeta(coletaId) {
  if (!confirm('✅ Confirma a conclusão desta coleta? Ela será movida para o histórico e o valor será creditado.')) {
    return;
  }

  try {
    const res = await fetchAutenticado(`${API_BASE_URL}/coletas/${coletaId}/concluir`, {
      method: 'PUT',
    });

    if (res.ok) {
      const data = await res.json();
      alert(`✅ Coleta concluída com sucesso!
      
💰 Valor creditado: R$ ${data.valor_creditado.toFixed(2).replace('.', ',')}
📜 A coleta foi movida para o histórico.`);

      carregarColetasAprovadas(); // Atualiza a lista de coletas gerenciáveis
      carregarEstatisticas(); // Atualiza estatísticas da home
      atualizarSaldoNaPagina(); // Atualiza saldo na página de recompensas
    } else {
      const data = await res.json();
      alert('❌ ' + (data.message || 'Erro ao concluir coleta'));
    }
  } catch (error) {
    console.error('Erro ao concluir coleta:', error);
    alert('❌ Erro ao conectar com o servidor');
  }
}

// Função para carregar histórico (para historico.html)
async function carregarHistorico() {
  try {
    const res = await fetchAutenticado(`${API_BASE_URL}/coletas/historico`); // Rota: /api/coletas/historico (GET)
    const coletas = await res.json();

    const container = document.getElementById('lista-historico'); // <-- ID do container em historico.html
    const emptyState = document.getElementById('empty-state'); // <-- ID da mensagem de estado vazio em historico.html

    if (!container) {
      console.warn('Elemento #lista-historico não encontrado na página atual. Histórico não será exibido.');
      return; // A função não pode prosseguir sem o container
    }
    
    // Calcula e exibe estatísticas específicas do histórico (se o elemento existir)
    exibirEstatisticasHistorico(coletas); // Chama a função auxiliar para exibir stats do histórico

    if (coletas.length === 0) {
      container.innerHTML = `
        <div class="empty-message">
          <h3>📭 Nenhuma coleta concluída</h3>
          <p>Suas coletas concluídas aparecerão aqui no histórico.</p>
          <a href="gerenciar-coletas.html" class="btn btn-primary">Ver Coletas Aprovadas</a>
        </div>
      `;
      if (emptyState) emptyState.style.display = 'block'; // Mostra a mensagem de estado vazio
      return;
    }

    if (emptyState) emptyState.style.display = 'none'; // Esconde a mensagem de estado vazio

    // Renderiza as coletas como cards na div 'lista-historico'
    container.innerHTML = coletas.map(coleta => `
      <div class="coleta-card">
        <div class="coleta-header">
          <h3>Coleta #${coleta.id}</h3>
          <span class="status-badge status-concluida">Concluída</span>
        </div>
        
        <div class="coleta-info">
          <div class="info-item">
            <span class="info-label">Cliente</span>
            <span class="info-value">${coleta.cliente}</span>
          </div>
          
          <div class="info-item">
            <span class="info-label">Endereço</span>
            <span class="info-value">${coleta.endereco}</span>
          </div>
          
          <div class="info-item">
            <span class="info-label">Quantidade</span>
            <span class="info-value">${coleta.quantidade} garrafas</span>
          </div>
          
          <div class="info-item">
            <span class="info-label">Data da Coleta</span>
            <span class="info-value">${formatarData(coleta.data)}</span>
          </div>
          
          <div class="info-item">
            <span class="info-label">Valor Creditado</span>
            <span class="info-value valor-destaque">R$ ${(parseFloat(coleta.valor) || 0).toFixed(2).replace('.', ',')}</span>
          </div>
          
          <div class="info-item">
            <span class="info-label">Concluída em</span>
            <span class="info-value">${formatarDataHora(coleta.updated_at)}</span>
          </div>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Erro ao carregar histórico:', error);
    const container = document.getElementById('lista-historico');
    if (container) {
      container.innerHTML = `
        <div class="empty-message">
          <h3>❌ Erro ao carregar histórico</h3>
          <p>Não foi possível carregar o histórico. Tente novamente.</p>
        </div>
      `;
    }
  }
}

// Função auxiliar para exibir estatísticas específicas do histórico (Nova)
function exibirEstatisticasHistorico(coletas) {
  const statsContainer = document.getElementById('stats-container'); // Elemento em historico.html
  if (!statsContainer) return;

  const totalColetas = coletas.length;
  const totalGarrafas = coletas.reduce((sum, coleta) => sum + coleta.quantidade, 0);
  const totalValor = coletas.reduce((sum, coleta) => sum + (parseFloat(coleta.valor) || 0), 0);
  
  statsContainer.innerHTML = `
    <div class="stat-card">
      <div class="stat-value">${totalColetas}</div>
      <div class="stat-label">Coletas Concluídas</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-value">${totalGarrafas}</div>
      <div class="stat-label">Garrafas Coletadas</div>
    </div>
    
    <div class="stat-card">
      <div class="stat-value">R$ ${totalValor.toFixed(2).replace('.', ',')}</div>
      <div class="stat-label">Total Ganho</div>
    </div>
  `;
}

// ================================
// FUNÇÕES DE ESTATÍSTICAS GLOBAIS (para home.html)
// ================================

// Função para carregar estatísticas
async function carregarEstatisticas() {
  try {
    // Carregar dados de todas as coletas para estatísticas
    const [pendentesRes, aprovadasRes, historicoRes] = await Promise.all([
      fetchAutenticado(`${API_BASE_URL}/coletas/pendentes`),
      fetchAutenticado(`${API_BASE_URL}/coletas/aprovadas`),
      fetchAutenticado(`${API_BASE_URL}/coletas/historico`)
    ]);

    const pendentes = await pendentesRes.json();
    const aprovadas = await aprovadasRes.json();
    const historico = await historicoRes.json();

    const totalColetas = pendentes.length + aprovadas.length + historico.length;
    const coletasConcluidas = historico.length;
    const totalGarrafas = historico.reduce((sum, coleta) => sum + coleta.quantidade, 0);
    const totalGanho = historico.reduce((sum, coleta) => sum + (parseFloat(coleta.valor) || 0), 0); // Ajuste aqui

    exibirEstatisticas({
      totalColetas,
      coletasConcluidas,
      totalGarrafas,
      totalGanho,
      pendentes: pendentes.length,
      aprovadas: aprovadas.length
    });
  } catch (error) {
    console.error('Erro ao carregar estatísticas:', error);
    exibirEstatisticas({
      totalColetas: 0,
      coletasConcluidas: 0,
      totalGarrafas: 0,
      totalGanho: 0,
      pendentes: 0,
      aprovadas: 0
    });
  }
}

// Função para exibir estatísticas na home (se o elemento stats-grid existir)
function exibirEstatisticas(stats) {
  const statsGrid = document.getElementById('stats-grid');
  
  if (!statsGrid) return;
  
  statsGrid.innerHTML = `
    <div class="stat-item">
      <div class="stat-value">${stats.totalColetas}</div>
      <div class="stat-label">Total de Coletas</div>
    </div>
    
    <div class="stat-item">
      <div class="stat-value">${stats.pendentes}</div>
      <div class="stat-label">Pendentes</div>
    </div>
    
    <div class="stat-item">
      <div class="stat-value">${stats.aprovadas}</div>
      <div class="stat-label">Aprovadas</div>
    </div>
    
    <div class="stat-item">
      <div class="stat-value">${stats.coletasConcluidas}</div>
      <div class="stat-label">Concluídas</div>
    </div>
    
    <div class="stat-item">
      <div class="stat-value">${stats.totalGarrafas}</div>
      <div class="stat-label">Garrafas Coletadas</div>
    </div>
    
    <div class="stat-item">
      <div class="stat-value">R$ ${stats.totalGanho.toFixed(2).replace('.', ',')}</div>
      <div class="stat-label">Total Ganho</div>
    </div>
  `;
}

// ================================
// FUNÇÕES DE RECOMPENSAS
// ================================

// Função para atualizar saldo na página (para recompensas.html)
async function atualizarSaldoNaPagina() {
  const saldoElement = document.getElementById('saldo-atual');
  if (!saldoElement) {
    // console.warn('Elemento #saldo-atual não encontrado na página atual.');
    return;
  }
  saldoElement.textContent = 'Carregando...'; // Feedback visual

  try {
    const res = await fetchAutenticado(`${API_BASE_URL}/usuario/saldo`); // Rota: /api/usuario/saldo (GET)
    const data = await res.json();

    const saldo = data.saldo;
    saldoElement.textContent = `R$ ${parseFloat(saldo).toFixed(2).replace('.', ',')}`;
    
    // Atualizar validação do campo valor se estiver visível (no modal de resgate)
    const valorInput = document.getElementById('valor');
    if (valorInput && valorInput.value) { // Verifica se o input existe e tem valor
      valorInput.dispatchEvent(new Event('input'));
    }
  } catch (error) {
    console.error('Erro ao carregar saldo:', error);
    saldoElement.textContent = 'Erro ao carregar';
  }
}

// Função para resgatar recompensa (chamada pelo form em recompensas.html)
async function resgatarRecompensa() { // Esta função é chamada pelo submit do formulário em recompensas.html
  // A lógica de pegar os valores do formulário e a confirmação é tratada no HTML
  // Esta função apenas executa a chamada de API.

  const valor = document.getElementById('valor').value;
  const nomeCompleto = document.getElementById('nome-completo').value;
  const chavePix = document.getElementById('chave-pix').value;

  if (!valor || !nomeCompleto || !chavePix) {
    alert('⚠️ Preencha todos os campos.');
    return;
  }

  // Validações adicionais (se não forem feitas no HTML)
  if (Number(valor) <= 0) {
    alert('⚠️ Valor deve ser maior que zero.');
    return;
  }

  try {
    const res = await fetchAutenticado(`${API_BASE_URL}/usuario/recompensa`, { // Rota: /api/usuario/recompensa (POST)
      method: 'POST',
      body: JSON.stringify({
        valor: Number(valor),
        nome_completo: nomeCompleto,
        chave_pix: chavePix
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(`✅ Resgate solicitado com sucesso!
      
💰 Valor: R$ ${Number(valor).toFixed(2).replace('.', ',')}
👤 Beneficiário: ${nomeCompleto}
🔑 Chave PIX: ${chavePix}
⏰ Processamento: até 24 horas

Novo saldo: R$ ${data.novo_saldo.toFixed(2).replace('.', ',')}`);
      
      // A limpeza do formulário e o fechamento do modal/esconder o formulário
      // serão tratados pelo script na página 'recompensas.html'
      // após a chamada desta função.
      atualizarSaldoNaPagina(); // Atualiza o saldo globalmente
      // esconderFormularioResgate(); // Essa função é específica do HTML

    } else {
      alert('❌ ' + (data.message || 'Erro ao processar resgate'));
    }
  } catch (error) {
    console.error('Erro ao processar resgate:', error);
    alert('❌ Erro ao conectar com o servidor');
  }
}

// ================================
// FUNÇÕES DE CONFIGURAÇÕES
// ================================

// Função para alterar senha (chamada pelo form em configuracoes.html)
async function alterarSenha() {
  // A lógica de pegar os valores do formulário e a confirmação é tratada no HTML
  // Esta função apenas executa a chamada de API.

  const senhaAtual = document.getElementById('senha-atual').value;
  const novaSenha = document.getElementById('nova-senha').value;
  const confirmarSenha = document.getElementById('confirmar-senha').value;

  if (!senhaAtual || !novaSenha || !confirmarSenha) {
    alert('⚠️ Preencha todos os campos.');
    return;
  }

  if (novaSenha !== confirmarSenha) {
    alert('⚠️ A nova senha e a confirmação não coincidem.');
    return;
  }

  if (novaSenha.length < 6) {
    alert('⚠️ A nova senha deve ter pelo menos 6 caracteres.');
    return;
  }

  try {
    // Rota para alterar senha (APENAS SE VOCÊ IMPLEMENTOU NO BACKEND)
    const res = await fetchAutenticado(`${API_BASE_URL}/usuario/senha`, { // Rota: /api/usuario/senha (PUT)
      method: 'PUT',
      body: JSON.stringify({
        senha_atual: senhaAtual,
        nova_senha: novaSenha
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('✅ Senha alterada com sucesso!');
      // A limpeza do formulário é responsabilidade do script na página HTML
      // document.getElementById('senha-form').reset();
    } else {
      alert('❌ ' + (data.message || 'Erro ao alterar senha'));
    }
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    alert('❌ Erro ao conectar com o servidor');
  }
}


// ================================
// FUNÇÕES DE RELATÓRIOS
// ================================

// Função para carregar relatório (para relatorios.html)
async function carregarRelatorio() {
  try {
    // Busque as coletas de gerenciamento (pendentes e aprovadas)
    const resGerenciar = await fetchAutenticado(`${API_BASE_URL}/coletas/gerenciar`);
    const coletasGerenciar = await resGerenciar.json();

    // Busque as coletas do histórico (concluídas)
    const resHistorico = await fetchAutenticado(`${API_BASE_URL}/coletas/historico`);
    const coletasHistorico = await resHistorico.json();

    // Combine todas as coletas
    const coletas = [...coletasGerenciar, ...coletasHistorico];

    const tbody = document.querySelector('#tabela-relatorio tbody');
    if (!tbody) {
      // console.warn('Elemento #tabela-relatorio tbody não encontrado na página atual.');
      return;
    }
    
    if (coletas.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" style="text-align: center; color: #6c757d; font-style: italic;">
            📭 Nenhuma coleta encontrada
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = coletas.map(coleta => `
      <tr>
        <td>${coleta.cliente}</td>
        <td>${formatarData(coleta.data)}</td>
        <td>${coleta.quantidade} garrafas</td>
        <td>R$ ${(parseFloat(coleta.valor) || coleta.quantidade * VALOR_POR_GARRAFA).toFixed(2).replace('.', ',')}</td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Erro ao carregar relatório:', error);
    const tbody = document.querySelector('#tabela-relatorio tbody');
    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" style="text-align: center; color: #dc3545;">
            ❌ Erro ao carregar relatório
          </td>
        </tr>
      `;
    }
  }
}

// ================================
// FUNÇÕES DE INICIALIZAÇÃO (Chamadas pelo DOMContentLoaded GLOBAL)
// ================================

// Função para calcular valor estimado em tempo real (para cadastro-coleta.html)
function calcularValorEstimado() {
  const quantidadeInput = document.getElementById('quantidade');
  const valueDisplay = document.querySelector('.value-display');
  
  if (quantidadeInput && valueDisplay) {
    quantidadeInput.addEventListener('input', function() {
      const quantidade = Number(this.value) || 0;
      const valorEstimado = quantidade * VALOR_POR_GARRAFA;
      
      if (quantidade > 0) {
        valueDisplay.innerHTML = `
          <strong>Valor por garrafa: R$ 0,85</strong><br>
          <strong>Valor estimado: R$ ${valorEstimado.toFixed(2).replace('.', ',')}</strong>
        `;
      } else {
        valueDisplay.innerHTML = '<strong>Valor por garrafa: R$ 0,85</strong>';
      }
    });
  }
}

// Função para definir data mínima (para cadastro-coleta.html)
function definirDataMinima() {
  const dataInput = document.getElementById('data');
  if (dataInput) {
    const hoje = new Date().toISOString().split('T')[0];
    dataInput.min = hoje;
  }
}


// Inicialização quando a página carrega (Este é o DOMContentLoaded GLOBAL do script.js)
document.addEventListener('DOMContentLoaded', function () {
  // Inicializar modo escuro
  initDarkMode();

  // Verificar autenticação ao carregar qualquer página
  // Isso garante que se o usuário não estiver logado e tentar acessar uma página restrita,
  // ele será redirecionado para a tela de login.
  verificarAutenticacao();

  // As funções abaixo são chamadas aqui para configurar listeners ou elementos
  // que podem existir em diferentes páginas. Elas verificam a existência dos elementos.
  calcularValorEstimado(); // Configura o listener para o input de quantidade (em cadastro-coleta.html)
  definirDataMinima();    // Configura a data mínima no input de data (em cadastro-coleta.html)
  
  // Nenhuma função de carregamento de dados (ex: carregarEstatisticas) é chamada aqui
  // diretamente, pois cada página HTML agora é responsável por chamar suas próprias
  // funções de carregamento no seu bloco de script local.
});