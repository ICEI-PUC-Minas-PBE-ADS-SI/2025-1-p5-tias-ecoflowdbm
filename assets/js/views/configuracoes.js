// Front/assets/js/views/configuracoes.js
import { verificarAutenticacao, getUsuarioLogado } from '../modules/auth.js';
import { api } from '../modules/api.js';
import { showAlert } from '../modules/domUtils.js';

export function initConfiguracoesPage() {
    if (!verificarAutenticacao()) return;

    const usuarioLogado = getUsuarioLogado();
    if (usuarioLogado) {
        document.getElementById('nome').value = usuarioLogado.nome;
        document.getElementById('email').value = usuarioLogado.email;
    }

    const form = document.getElementById('form-config');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            alterarSenha();
        });
    }
    // TODO: Você também pode adicionar a lógica para atualizar o saldo na página se houver um elemento para isso.
    // atualizarSaldoNaPagina(); // Esta função não está definida aqui, precisaria ser importada ou criada.
}

async function alterarSenha() {
    const senhaAtual = document.getElementById('senha-atual').value;
    const novaSenha = document.getElementById('nova-senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
        showAlert('Todos os campos de senha são obrigatórios.');
        return;
    }

    if (novaSenha !== confirmarSenha) {
        showAlert('Nova senha e confirmação de senha não coincidem.');
        return;
    }

    const usuarioLogado = getUsuarioLogado();
    if (!usuarioLogado) {
        showAlert('Usuário não logado.');
        return;
    }

    try {
        // Rota para alterar senha no backend (precisa ser implementada se ainda não estiver)
        // Exemplo: PUT /api/usuario/:id/senha
        const res = await api.put(`/usuario/${usuarioLogado.id}/alterar-senha`, {
            senhaAtual: senhaAtual,
            novaSenha: novaSenha
        });

        const data = await res.json();

        if (res.ok) {
            showAlert('Senha alterada com sucesso!');
            document.getElementById('form-config').reset();
        } else {
            showAlert('Erro ao alterar senha: ' + (data.message || 'Erro desconhecido.'));
        }
    } catch (error) {
        console.error('Erro de conexão ao tentar alterar senha:', error);
        showAlert('Erro ao conectar com o servidor para alterar senha. Tente novamente.');
    }
}