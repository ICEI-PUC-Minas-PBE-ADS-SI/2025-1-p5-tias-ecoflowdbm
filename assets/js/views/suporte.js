// Front/assets/js/views/suporte.js
import { verificarAutenticacao } from '../modules/auth.js';

export function initSuportePage() {
    if (!verificarAutenticacao()) return;

    // Nada de lógica JS complexa aqui, o onclick do botão já lida com o WhatsApp.
    // Se houver mais interatividade no futuro, adicione aqui.
}