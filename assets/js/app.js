// Front/assets/js/app.js
import { loadCommonUI } from './modules/uiComponents.js';

// Carrega cabeçalho e rodapé em todas as páginas (onde há placeholder)
loadCommonUI();

// Inicializa a lógica específica da página atual
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.includes('acessar.html')) {
        import('./views/acessar.js').then(module => module.initAcessarPage());
    } else if (path.includes('cadastro.html')) {
        import('./views/cadastro.js').then(module => module.initCadastroPage());
    } else if (path.includes('acompanhar-coleta.html')) {
        import('./views/acompanharColeta.js').then(module => module.initAcompanharColetaPage());
    } else if (path.includes('cadastro-coleta.html')) {
        import('./views/cadastroColeta.js').then(module => module.initCadastroColetaPage());
    } else if (path.includes('configuracoes.html')) {
        import('./views/configuracoes.js').then(module => module.initConfiguracoesPage());
    } else if (path.includes('gerenciar-coletas.html')) {
        import('./views/gerenciarColetas.js').then(module => module.initGerenciarColetasPage());
    } else if (path.includes('home.html')) {
        import('./views/home.js').then(module => module.initHomePage());
    } else if (path.includes('historico.html')) {
        import('./views/historico.js').then(module => module.initHistoricoPage());
    } else if (path.includes('recompensas.html')) {
        import('./views/recompensas.js').then(module => module.initRecompensasPage());
    } else if (path.includes('relatorios.html')) {
        import('./views/relatorios.js').then(module => module.initRelatoriosPage());
    } else if (path.includes('recuperar-senha.html')) {
        import('./views/recuperarSenha.js').then(module => module.initRecuperarSenhaPage());
    } else if (path.includes('suporte.html')) {
        import('./views/suporte.js').then(module => module.initSuportePage());
    }
    // Para a página index.html na raiz (se não redirecionar automaticamente para login)
    else if (path === '/' || path.includes('index.html')) {
        // Nada específico para inicializar aqui, a menos que haja um script de boas-vindas
    }
});