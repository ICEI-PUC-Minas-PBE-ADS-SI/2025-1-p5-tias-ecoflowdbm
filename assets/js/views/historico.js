// Front/assets/js/views/historico.js
import { verificarAutenticacao } from '../modules/auth.js';
import { api } from '../modules/api.js';
import { formatarData, formatarDataHora } from '../modules/dateUtils.js';
import { showAlert } from '../modules/domUtils.js';

export function initHistoricoPage() {
    if (!verificarAutenticacao()) return;

    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', carregarHistorico);
    }

    carregarHistorico();
}

async function carregarHistorico() {
    try {
        const response = await api.get('/coletas/historico');

        if (!response.ok) {
            throw new Error('Erro ao carregar histórico');
        }

        const coletas = await response.json();
        exibirEstatisticas(coletas);
        exibirHistoricoColetas(coletas); // Renomeei para evitar conflito com o nome do arquivo
    } catch (error) {
        console.error('Erro ao carregar histórico:', error);
        showAlert('Erro ao carregar histórico. Tente novamente.');
    }
}

function exibirEstatisticas(coletas) {
    const statsContainer = document.getElementById('stats-container');

    const totalColetas = coletas.length;
    const totalGarrafas = coletas.reduce((sum, coleta) => sum + coleta.quantidade, 0);
    const totalValor = coletas.reduce((sum, coleta) => sum + (coleta.valor || 0), 0);

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

function exibirHistoricoColetas(coletas) { // Função renomeada
    const container = document.getElementById('lista-historico');
    const emptyState = document.getElementById('empty-state');

    if (coletas.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

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
                    <span class="info-value valor-destaque">R$ ${coleta.valor ? coleta.valor.toFixed(2).replace('.', ',') : '0,00'}</span>
                </div>

                <div class="info-item">
                    <span class="info-label">Concluída em</span>
                    <span class="info-value">${formatarDataHora(coleta.updated_at)}</span>
                </div>
            </div>
        </div>
    `).join('');
}