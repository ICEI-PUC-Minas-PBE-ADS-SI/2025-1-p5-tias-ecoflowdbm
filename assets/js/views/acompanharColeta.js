// Front/assets/js/views/acompanharColeta.js
import { verificarAutenticacao } from '../modules/auth.js';
import { api } from '../modules/api.js';
import { formatarData, formatarDataHora } from '../modules/dateUtils.js';
import { showAlert } from '../modules/domUtils.js';

export function initAcompanharColetaPage() {
    if (!verificarAutenticacao()) return;

    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', carregarColetasPendentes);
    }

    carregarColetasPendentes();
}

async function carregarColetasPendentes() {
    try {
        const response = await api.get('/coletas/pendentes');
        if (!response.ok) {
            throw new Error('Erro ao carregar coletas pendentes');
        }
        const coletas = await response.json();
        exibirColetasPendentes(coletas);
    } catch (error) {
        console.error('Erro ao carregar coletas pendentes:', error);
        showAlert('Erro ao carregar coletas pendentes. Tente novamente.');
    }
}

function exibirColetasPendentes(coletas) {
    const container = document.getElementById('lista-coletas-pendentes');
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
                <span class="status-badge status-pendente">Pendente</span>
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
                    <span class="info-label">Data</span>
                    <span class="info-value">${formatarData(coleta.data)}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Valor Estimado</span>
                    <span class="info-value">R$ ${coleta.valor ? coleta.valor.toFixed(2).replace('.', ',') : '0,00'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Cadastrada em</span>
                    <span class="info-value">${formatarDataHora(coleta.created_at)}</span>
                </div>
            </div>
        </div>
    `).join('');
}