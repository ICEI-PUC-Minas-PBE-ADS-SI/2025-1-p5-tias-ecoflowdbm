// Front/assets/js/views/recuperarSenha.js
import { showAlert } from '../modules/domUtils.js';

export function initRecuperarSenhaPage() {
    const recuperarForm = document.getElementById('recuperar-form');
    if (recuperarForm) {
        recuperarForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aqui você integraria com uma rota de backend para recuperação de senha
            // Por enquanto, é apenas um alerta estático
            showAlert("Link de recuperação enviado para seu email!");
            window.location.href = "acessar.html"; // Redireciona para login
        });
    }
}