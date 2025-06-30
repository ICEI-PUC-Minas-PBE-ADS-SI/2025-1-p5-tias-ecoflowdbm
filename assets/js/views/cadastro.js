// Front/assets/js/views/cadastro.js
import { cadastrar } from '../modules/auth.js';

export function initCadastroPage() {
    const cadastroForm = document.getElementById('cadastro-form');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            cadastrar();
        });
    }
}