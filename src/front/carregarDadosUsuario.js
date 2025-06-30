// Função para carregar dados do usuário na interface
function carregarDadosUsuario() {
  const usuario = getUsuarioLogado();
  if (!usuario) {
    showScreen('login-screen');
    return;
  }
  
  // Atualizar nome do usuário na interface se houver elementos para isso
  const nomeElements = document.querySelectorAll('.nome-usuario');
  nomeElements.forEach(element => {
    element.textContent = usuario.nome;
  });
  
  // Carregar dados da aba atual
  if (currentTab === 'home-tab') {
    carregarEstatisticas();
  }
}

