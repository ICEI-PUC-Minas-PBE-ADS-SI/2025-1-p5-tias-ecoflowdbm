// Front/assets/js/views/acessar.js
import { fazerLogin, verificarAutenticacao } from '../modules/auth.js';

export function initAcessarPage() {
    // Se o usuário já estiver autenticado, redireciona para a home
    if (localStorage.getItem('jwtToken') && localStorage.getItem('usuarioLogado')) {
        window.location.href = 'home.html';
        return;
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            fazerLogin();
        });
    }
}