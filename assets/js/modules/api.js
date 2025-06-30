// Front/assets/js/modules/api.js
import { API_BASE_URL } from './constants.js';
import { verificarAutenticacao } from './auth.js';
import { showAlert } from './domUtils.js';

export async function fetchAutenticado(url, options = {}) {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        verificarAutenticacao(); // Isso redireciona
        throw new Error('Token de autenticação não encontrado. Redirecionando para login.');
    }

    const headers = {
        ...options.headers,
        'Authorization': token,
        'Content-Type': 'application/json'
    };

    const config = {
        ...options,
        headers
    };

    try {
        const response = await fetch(url, config);

        if (response.status === 401) {
            showAlert('Sessão expirada ou inválida. Por favor, faça login novamente.');
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('usuarioLogado');
            window.location.href = 'pages/acessar.html'; // Corrigido o caminho para acessar.html
            return response;
        }

        return response;
    } catch (error) {
        console.error('Erro na requisição autenticada:', error);
        showAlert('Erro de conexão. Verifique se o backend está rodando e sua internet.');
        throw error;
    }
}

export const api = {
    get: (path) => fetchAutenticado(`${API_BASE_URL}${path}`),
    post: (path, data) => fetchAutenticado(`${API_BASE_URL}${path}`, { method: 'POST', body: JSON.stringify(data) }),
    put: (path, data) => fetchAutenticado(`${API_BASE_URL}${path}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (path) => fetchAutenticado(`${API_BASE_URL}${path}`, { method: 'DELETE' }),
};