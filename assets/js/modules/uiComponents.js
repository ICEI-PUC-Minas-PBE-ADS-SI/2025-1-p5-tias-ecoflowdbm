// Front/assets/js/modules/uiComponents.js

async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error(`Erro ao carregar o componente ${componentPath}:`, error);
    }
}

export function loadCommonUI() {
    loadComponent('header-placeholder', '../components/header.html');
    loadComponent('footer-placeholder', '../components/footer.html');

    // Aplica o modo escuro salvo no localStorage ao carregar a página
    document.addEventListener('DOMContentLoaded', () => {
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark');
        }
    });
}

// Função global para dark mode
window.toggleDarkMode = function() {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
};