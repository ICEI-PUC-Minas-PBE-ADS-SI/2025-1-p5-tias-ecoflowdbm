// Front/assets/js/modules/auth.js
import { API_BASE_URL } from './constants.js';
import { showAlert } from './domUtils.js';

export function verificarAutenticacao() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        window.location.href = '../pages/acessar.html'; // Corrigido o caminho relativo
        return false;
    }
    return true;
}

export function getUsuarioLogado() {
    const usuarioString = localStorage.getItem('usuarioLogado');
    return usuarioString ? JSON.parse(usuarioString) : null;
}

export async function fazerLogin() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha }),
        });
        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('jwtToken', data.token);
            localStorage.setItem('usuarioLogado', JSON.stringify(data.user));
            window.location.href = '../pages/home.html'; // Redireciona para a página home
        } else {
            showAlert('❌ ' + (data.message || 'Erro ao fazer login'));
        }
    } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
        showAlert('❌ Erro ao conectar com o servidor. Verifique sua conexão e tente novamente.');
    }
}

export async function cadastrar() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const res = await fetch(`${API_BASE_URL}/auth/cadastro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha }),
        });
        const data = await res.json();

        if (res.ok) {
            showAlert('✅ ' + data.message + '\nAgora você pode acessar sua conta.');
            window.location.href = '../pages/acessar.html'; // Redireciona para a página de login
        } else {
            showAlert('❌ ' + (data.message || 'Erro ao cadastrar usuário'));
        }
    } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
        showAlert('❌ Erro ao conectar com o servidor. Verifique sua conexão e tente novamente.');
    }
}

// Nova função para sair
export function sair() {
    if (confirm("Tem certeza que deseja sair?")) {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('usuarioLogado');
        window.location.href = '../pages/acessar.html'; // Redireciona para a página de login
    }
}

// Expõe a função sair no escopo global para onclick no HTML
window.sair = sair;