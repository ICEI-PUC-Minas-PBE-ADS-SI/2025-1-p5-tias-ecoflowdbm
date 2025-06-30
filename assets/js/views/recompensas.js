// Front/assets/js/views/recompensas.js
import { verificarAutenticacao, getUsuarioLogado } from '../modules/auth.js';
import { api } from '../modules/api.js';
import { showAlert } from '../modules/domUtils.js';

export function initRecompensasPage() {
    if (!verificarAutenticacao()) return;

    // Carregar saldo inicial
    atualizarSaldoNaPagina();

    // Adicionar eventos aos botões
    const btnAtualizarSaldo = document.querySelector('.actions-section .btn-secondary');
    if (btnAtualizarSaldo) {
        btnAtualizarSaldo.addEventListener('click', atualizarSaldoNaPagina);
    }

    const btnResgatarRecompensa = document.querySelector('.actions-section .btn-primary');
    if (btnResgatarRecompensa) {
        btnResgatarRecompensa.addEventListener('click', mostrarFormularioResgate);
    }

    const btnCancelarResgate = document.querySelector('#resgate-form .btn-back');
    if (btnCancelarResgate) {
        btnCancelarResgate.addEventListener('click', esconderFormularioResgate);
    }

    // Validação em tempo real do valor
    const valorInput = document.getElementById('valor');
    if (valorInput) {
        valorInput.addEventListener('input', function () {
            const valor = parseFloat(this.value) || 0;
            const saldoAtualText = document.getElementById('saldo-atual').textContent;
            const saldoAtual = parseFloat(saldoAtualText.replace('R$ ', '').replace(',', '.')) || 0;

            if (valor > saldoAtual) {
                this.setCustomValidity('Valor não pode ser maior que o saldo disponível');
            } else if (valor < 10) { // Valor mínimo fixo como R$10,00
                this.setCustomValidity('Valor mínimo para resgate é R$ 10,00');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    // Formulário de resgate
    const formResgate = document.getElementById('form-resgate');
    if (formResgate) {
        formResgate.addEventListener('submit', async function (e) {
            e.preventDefault();

            const valor = parseFloat(document.getElementById('valor').value);
            const nomeCompleto = document.getElementById('nome-completo').value;
            const chavePix = document.getElementById('chave-pix').value;

            if (!valor || !nomeCompleto || !chavePix) {
                showAlert('⚠️ Preencha todos os campos.');
                return;
            }

            if (valor < 10) {
                showAlert('⚠️ Valor mínimo para resgate é R$ 10,00.');
                return;
            }

            const saldoAtualText = document.getElementById('saldo-atual').textContent;
            const saldoAtual = parseFloat(saldoAtualText.replace('R$ ', '').replace(',', '.')) || 0;

            if (valor > saldoAtual) {
                showAlert('⚠️ Valor não pode ser maior que o saldo disponível.');
                return;
            }

            if (!confirm(`Confirmar resgate de R$ ${valor.toFixed(2).replace('.', ',')} para a chave PIX: ${chavePix}?`)) {
                return;
            }

            try {
                const response = await api.post('/recompensa', {
                    valor: valor,
                    nome_completo: nomeCompleto,
                    chave_pix: chavePix
                });

                const result = await response.json();

                if (response.ok) {
                    // Completa o showAlert aqui
                    showAlert(`✅ Resgate solicitado com sucesso!
                    
💰 Valor: R$ ${valor.toFixed(2).replace('.', ',')}
👤 Beneficiário: ${nomeCompleto}
🔑 Chave PIX: ${chavePix}
⏰ Processamento: até 24 horas

Novo saldo: R$ ${result.novo_saldo.toFixed(2).replace('.', ',')}`);

                    // Atualizar saldo e esconder formulário
                    await atualizarSaldoNaPagina();
                    esconderFormularioResgate();
                } else {
                    showAlert('❌ ' + (result.message || 'Erro ao processar resgate'));
                }
            } catch (error) {
                console.error('Erro ao processar resgate:', error);
                showAlert('❌ Erro ao conectar com o servidor. Tente novamente.');
            }
        });
    }

    // Funções auxiliares para Recompensas
    async function obterSaldo() {
        try {
            const response = await api.get('/usuario/saldo');
            if (!response.ok) {
                throw new Error('Erro ao buscar saldo');
            }
            const data = await response.json();
            return parseFloat(data.saldo);
        } catch (error) {
            console.error('Erro ao obter saldo:', error);
            showAlert('Não foi possível carregar seu saldo.');
            return 0; // Retorna 0 em caso de erro
        }
    }

    async function atualizarSaldoNaPagina() {
        const saldoElement = document.getElementById('saldo-atual');
        if (saldoElement) { // Adicionado verificação para garantir que o elemento existe
            saldoElement.textContent = 'Carregando...';
        }

        try {
            const saldo = await obterSaldo();
            if (saldoElement) { // Adicionado verificação novamente antes de atualizar
                saldoElement.textContent = `R$ ${saldo.toFixed(2).replace('.', ',')}`;
            }

            const valorInput = document.getElementById('valor');
            if (valorInput && valorInput.value) { // Verifica se o input de valor existe e tem um valor
                valorInput.dispatchEvent(new Event('input')); // Revalida o campo valor
            }
        } catch (error) {
            console.error('Erro ao carregar saldo:', error);
            if (saldoElement) { // Adicionado verificação antes de exibir erro
                saldoElement.textContent = 'Erro ao carregar';
            }
        }
    }

    function mostrarFormularioResgate() {
        const resgateForm = document.getElementById('resgate-form');
        if (resgateForm) {
            resgateForm.classList.add('active');
        }
        const valorInput = document.getElementById('valor');
        if (valorInput) {
            valorInput.focus();
            valorInput.setCustomValidity(''); // Limpa validações anteriores
        }
    }

    function esconderFormularioResgate() {
        const resgateForm = document.getElementById('resgate-form');
        if (resgateForm) {
            resgateForm.classList.remove('active');
        }
        const formResgate = document.getElementById('form-resgate');
        if (formResgate) {
            formResgate.reset();
        }
    }
}