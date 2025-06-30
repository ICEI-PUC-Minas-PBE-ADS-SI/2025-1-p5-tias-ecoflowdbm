// Teste de comunicação entre frontend e backend
console.log('=== TESTE DE COMUNICAÇÃO ===');

// Verificar se o usuário está logado
const token = localStorage.getItem('token');
const usuario = localStorage.getItem('usuarioLogado');

console.log('Token:', token);
console.log('Usuário:', usuario);

if (!token || !usuario) {
    console.error('❌ Usuário não está logado corretamente');
} else {
    console.log('✅ Usuário logado');
    
    // Testar requisição para o backend
    fetch('http://localhost:3000/saldo', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then(response => {
        console.log('Status da resposta:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('✅ Comunicação com backend funcionando:', data);
    })
    .catch(error => {
        console.error('❌ Erro na comunicação com backend:', error);
    });
}

