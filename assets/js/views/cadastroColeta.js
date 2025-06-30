// Front/assets/js/views/cadastroColeta.js
import { verificarAutenticacao, getUsuarioLogado } from '../modules/auth.js';
import { api } from '../modules/api.js';
import { showLoading, hideLoading, showAlert } from '../modules/domUtils.js';
import { VALOR_POR_GARRAFA_FRONTEND } from '../modules/constants.js';

export function initCadastroColetaPage() {
    if (!verificarAutenticacao()) return;

    document.getElementById('data').min = new Date().toISOString().split('T')[0];

    const quantidadeInput = document.getElementById('quantidade');
    const valueDisplay = document.querySelector('.value-display');
    const form = document.getElementById('form-coleta');
    const loading = document.getElementById('loading');
    const btnSubmit = document.getElementById('btn-submit');

    quantidadeInput.addEventListener('input', function() {
        const quantidade = parseInt(this.value) || 0;
        const valorEstimado = quantidade * VALOR_POR_GARRAFA_FRONTEND;

        if (quantidade > 0) {
            valueDisplay.innerHTML = `
                <strong>Valor por garrafa: R$ ${VALOR_POR_GARRAFA_FRONTEND.toFixed(2).replace('.', ',')}</strong><br>
                <span style="color: #2e7d32; font-size: 1.2rem;">
                    Valor estimado: R$ ${valorEstimado.toFixed(2).replace('.', ',')}
                </span>
            `;
        } else {
            valueDisplay.innerHTML = `<strong>Valor por garrafa: R$ ${VALOR_POR_GARRAFA_FRONTEND.toFixed(2).replace('.', ',')}</strong>`;
        }
    });

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        showLoading(loading, btnSubmit, 'Cadastrando...');

        try {
            await adicionarColeta();
        } finally {
            hideLoading(loading, btnSubmit, '✅ Cadastrar Coleta');
        }
    });
}

async function adicionarColeta() {
    const cliente = document.getElementById('cliente').value;
    const endereco = document.getElementById('endereco').value;
    const data = document.getElementById('data').value;
    const quantidade = document.getElementById('quantidade').value;

    if (!cliente || !endereco || !data || !quantidade) {
        showAlert('⚠️ Preencha todos os campos.');
        return;
    }

    if (Number(quantidade) <= 0) {
        showAlert('⚠️ Quantidade deve ser maior que zero.');
        return;
    }

    const usuarioLogado = getUsuarioLogado();

    try {
        const res = await api.post('/coleta', {
            usuario_id: usuarioLogado.id, // O backend espera o usuario_id aqui
            cliente,
            endereco,
            quantidade: Number(quantidade),
            data,
        });

        const dataRes = await res.json();

        if (res.ok) {
            const valorEstimado = dataRes.valor_estimado || (Number(quantidade) * VALOR_POR_GARRAFA_FRONTEND);

            // CORREÇÃO AQUI: Feche a template string e remova o }; extra
            showAlert(`✅ Coleta cadastrada com sucesso!
📋 Detalhes:
• Cliente: ${cliente}
• Endereço: ${endereco}
• Quantidade: ${quantidade} garrafas
• Valor estimado: R$ ${valorEstimado.toFixed(2).replace('.', ',')}
• Status: Pendente (aguardando aprovação)

🔄 Você pode acompanhar o status na aba "Acompanhar Coleta".`);
            
            // Limpar formulário
            document.getElementById('form-coleta').reset();
            document.querySelector('.value-display').innerHTML = `<strong>Valor por garrafa: R$ ${VALOR_POR_GARRAFA_FRONTEND.toFixed(2).replace('.', ',')}</strong>`;
            document.getElementById('data').min = new Date().toISOString().split('T')[0];
            
        } else {
            showAlert('❌ ' + (dataRes.message || 'Erro ao cadastrar coleta'));
        }
    } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
        showAlert('❌ Erro ao conectar com o servidor. Verifique sua conexão e tente novamente.');
    }
}