// Front/assets/js/views/gerenciarColetas.js
import { verificarAutenticacao } from '../modules/auth.js';
import { api } from '../modules/api.js';
import { formatarData, formatarDataHora } from '../modules/dateUtils.js';
import { showAlert } from '../modules/domUtils.js';

let coletaEditando = null; // Variável global para armazenar o ID da coleta sendo editada

export function initGerenciarColetasPage() {
    if (!verificarAutenticacao()) return;

    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) {
        // Este botão pode carregar todas as coletas (pendentes e aprovadas) da nova rota /coletas/gerenciar
        refreshBtn.addEventListener('click', carregarColetasGerenciamento);
    }

    // Fechar modal ao clicar no 'x'
    const closeBtn = document.querySelector('#modal-editar .close');
    if (closeBtn) {
        closeBtn.addEventListener('click', fecharModal);
    }

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('modal-editar');
        if (event.target === modal) {
            fecharModal();
        }
    });

    // Event listener para salvar edição
    const formEditar = document.getElementById('form-editar');
    if (formEditar) {
        formEditar.addEventListener('submit', async function(e) {
            e.preventDefault();
            await salvarEdicao();
        });
    }

    carregarColetasGerenciamento(); // Carrega as coletas ao iniciar a página
}

async function carregarColetasGerenciamento() {
    try {
        // Usando a rota /coletas/gerenciar do backend que busca pendentes e aprovadas
        const response = await api.get('/coletas/gerenciar');

        if (!response.ok) {
            throw new Error('Erro ao carregar coletas para gerenciamento');
        }

        const coletas = await response.json();
        exibirColetasGerenciamento(coletas);
    } catch (error) {
        console.error('Erro ao carregar coletas para gerenciamento:', error);
        showAlert('Erro ao carregar coletas para gerenciamento. Tente novamente.');
    }
}

function exibirColetasGerenciamento(coletas) {
    const container = document.getElementById('lista-coletas-aprovadas'); // Manter o ID do container
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
                <span class="status-badge status-${coleta.status}">${coleta.status.toUpperCase()}</span>
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
                    <span class="info-label">Valor</span>
                    <span class="info-value">R$ ${coleta.valor ? coleta.valor.toFixed(2).replace('.', ',') : '0,00'}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">${coleta.status === 'pendente' ? 'Criada em' : 'Atualizada em'}</span>
                    <span class="info-value">${formatarDataHora(coleta.updated_at || coleta.created_at)}</span>
                </div>
            </div>

            <div class="coleta-actions">
                ${coleta.status === 'pendente' ? `<button class="btn btn-edit" onclick="aprovarColeta(${coleta.id})">✔️ Aprovar</button>` : ''}
                ${coleta.status === 'aprovada' ? `<button class="btn btn-edit" onclick="editarColeta(${coleta.id})">✏️ Editar</button>` : ''}
                ${coleta.status === 'aprovada' ? `<button class="btn btn-delete" onclick="excluirColeta(${coleta.id})">🗑️ Excluir</button>` : ''}
                ${coleta.status === 'aprovada' ? `<button class="btn btn-complete" onclick="concluirColeta(${coleta.id})">✅ Concluir</button>` : ''}
            </div>
        </div>
    `).join('');
}

// Funções de ação de coletas (declaradas no escopo global para onclick no HTML)
window.aprovarColeta = async function(id) {
    if (!confirm('Tem certeza que deseja aprovar esta coleta?')) return;
    try {
        const response = await api.put(`/coletas/${id}/aprovar`);
        const result = await response.json();
        if (response.ok) {
            showAlert('Coleta aprovada com sucesso!');
            carregarColetasGerenciamento();
        } else {
            showAlert(result.message || 'Erro ao aprovar coleta');
        }
    } catch (error) {
        console.error('Erro ao aprovar coleta:', error);
        showAlert('Erro ao aprovar coleta');
    }
}

window.editarColeta = async function(id) {
    try {
        // Buscar coleta específica usando a rota /coletas/gerenciar e filtrando
        const response = await api.get('/coletas/gerenciar');
        const coletas = await response.json();
        const coleta = coletas.find(c => c.id === id);

        if (!coleta) {
            showAlert('Coleta não encontrada');
            return;
        }

        // Preencher formulário do modal
        document.getElementById('edit-cliente').value = coleta.cliente;
        document.getElementById('edit-endereco').value = coleta.endereco;
        document.getElementById('edit-quantidade').value = coleta.quantidade;
        document.getElementById('edit-data').value = coleta.data;

        coletaEditando = id;
        document.getElementById('modal-editar').style.display = 'block';
    } catch (error) {
        console.error('Erro ao carregar dados da coleta para edição:', error);
        showAlert('Erro ao carregar dados da coleta para edição');
    }
}

window.fecharModal = function() {
    document.getElementById('modal-editar').style.display = 'none';
    coletaEditando = null;
}

async function salvarEdicao() {
    if (!coletaEditando) return;

    const dados = {
        cliente: document.getElementById('edit-cliente').value,
        endereco: document.getElementById('edit-endereco').value,
        quantidade: parseInt(document.getElementById('edit-quantidade').value),
        data: document.getElementById('edit-data').value
    };

    try {
        const response = await api.put(`/coletas/${coletaEditando}`, dados);
        const result = await response.json();

        if (response.ok) {
            showAlert('Coleta editada com sucesso!');
            fecharModal();
            carregarColetasGerenciamento();
        } else {
            showAlert(result.message || 'Erro ao editar coleta');
        }
    } catch (error) {
        console.error('Erro ao salvar edição da coleta:', error);
        showAlert('Erro ao salvar edição da coleta');
    }
}

window.excluirColeta = async function(id) {
    if (!confirm('Tem certeza que deseja excluir esta coleta?')) {
        return;
    }

    try {
        const response = await api.delete(`/coletas/${id}`);
        const result = await response.json();

        if (response.ok) {
            showAlert('Coleta excluída com sucesso!');
            carregarColetasGerenciamento();
        } else {
            showAlert(result.message || 'Erro ao excluir coleta');
        }
    } catch (error) {
        console.error('Erro ao excluir coleta:', error);
        showAlert('Erro ao excluir coleta');
    }
}

window.concluirColeta = async function(id) {
    if (!confirm('Tem certeza que deseja concluir esta coleta? O valor será creditado ao seu saldo.')) {
        return;
    }

    try {
        const response = await api.put(`/coletas/${id}/concluir`);
        const result = await response.json();

        if (response.ok) {
            showAlert(`Coleta concluída com sucesso!\\nValor creditado: R$ ${result.valor_creditado.toFixed(2).replace('.', ',')}\\nNovo saldo: R$ ${result.novo_saldo.toFixed(2).replace('.', ',')}`);
            carregarColetasGerenciamento();
        } else {
            showAlert(result.message || 'Erro ao concluir coleta');
        }
    } catch (error) {
        console.error('Erro ao concluir coleta:', error);
        showAlert('Erro ao concluir coleta');
    }
}