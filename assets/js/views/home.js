// Front/assets/js/views/home.js
import { verificarAutenticacao } from '../modules/auth.js';
import { api } from '../modules/api.js';
import { getUsuarioLogado } from '../modules/auth.js'; // Para obter nome do usuário
import { showAlert } from '../modules/domUtils.js';

export function initHomePage() {
    if (!verificarAutenticacao()) return;

    // Atualizar mensagem de boas-vindas com o nome do usuário
    const usuario = getUsuarioLogado();
    if (usuario && usuario.nome) {
        const welcomeText = document.querySelector('.header-left p');
        if (welcomeText) {
            welcomeText.textContent = `Bem-vindo(a) ${usuario.nome} ao seu painel de gestão!`;
        }
    }

    // Carregar estatísticas
    carregarEstatisticas();
}

async function carregarEstatisticas() {
    try {
        // Carregar dados de todas as coletas para estatísticas
        const [pendentesRes, aprovadasRes, historicoRes] = await Promise.all([
            api.get('/coletas/pendentes'),
            api.get('/coletas/aprovadas'),
            api.get('/coletas/historico')
        ]);

        const pendentes = await pendentesRes.json();
        const aprovadas = await aprovadasRes.json();
        const historico = await historicoRes.json();

        const totalColetas = pendentes.length + aprovadas.length + historico.length;
        const coletasConcluidas = historico.length;
        const totalGarrafas = historico.reduce((sum, coleta) => sum + coleta.quantidade, 0);
        const totalGanho = historico.reduce((sum, coleta) => sum + (coleta.valor || 0), 0);
        const coletasPendentes = pendentes.length;
        const coletasAprovadas = aprovadas.length;


        exibirEstatisticas({
            totalColetas,
            coletasConcluidas,
            totalGarrafas,
            totalGanho,
            pendentes: coletasPendentes,
            aprovadas: coletasAprovadas
        });
    } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
        showAlert('Erro ao carregar estatísticas. Tente novamente.');
        // Exibir estatísticas vazias em caso de erro
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

function exibirEstatisticas(stats) {
    const statsGrid = document.getElementById('stats-grid');

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