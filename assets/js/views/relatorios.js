// Front/assets/js/views/relatorios.js
import { verificarAutenticacao } from '../modules/auth.js';
import { api } from '../modules/api.js';
import { formatarData } from '../modules/dateUtils.js';
import { showAlert } from '../modules/domUtils.js';
import { VALOR_POR_GARRAFA_FRONTEND } from '../modules/constants.js';

export function initRelatoriosPage() {
    if (!verificarAutenticacao()) return;

    // Adicionar eventos aos botões
    const btnGerarPdf = document.getElementById('btn-gerar-pdf');
    if (btnGerarPdf) {
        btnGerarPdf.addEventListener('click', gerarPDF);
    }

    const btnGerarExcel = document.getElementById('btn-gerar-excel');
    if (btnGerarExcel) {
        btnGerarExcel.addEventListener('click', gerarExcel);
    }

    carregarRelatorio();
}

async function carregarRelatorio() {
    const tbody = document.querySelector('#tabela-relatorio tbody');
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Carregando...</td></tr>';

    try {
        // Buscando coletas concluídas para o relatório
        const response = await api.get('/coletas/historico');
        if (!response.ok) {
            throw new Error('Erro ao carregar histórico para relatório');
        }
        const coletas = await response.json();

        tbody.innerHTML = ''; // Limpa o "Carregando..."

        if (coletas.length === 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = '<td colspan="4" style="text-align:center;">Nenhuma coleta concluída encontrada para o relatório.</td>';
            tbody.appendChild(tr);
            return;
        }

        coletas.forEach(coleta => {
            const valor = (Number(coleta.valor || (coleta.quantidade * VALOR_POR_GARRAFA_FRONTEND))).toFixed(2);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${coleta.cliente}</td>
                <td>${formatarData(coleta.data)}</td>
                <td>${coleta.quantidade}</td>
                <td>${valor.replace('.', ',')}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar relatório:', error);
        showAlert('Erro ao carregar dados do relatório. Tente novamente.');
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color: red;">Erro ao carregar dados.</td></tr>';
    }
}

// Funções de geração de PDF e Excel (dependem de bibliotecas externas)
function gerarPDF() {
    if (typeof window.jspdf === 'undefined' || typeof window.jspdf.A === 'undefined') {
        showAlert('Bibliotecas jsPDF não carregadas. Verifique a conexão ou os scripts no HTML.');
        return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Relatório de Coletas - EcoFlow DBM", 14, 15);

    doc.autoTable({
        html: '#tabela-relatorio',
        startY: 20,
        headStyles: { fillColor: [0, 168, 107] },
    });

    doc.save('relatorio-coletas.pdf');
}

function gerarExcel() {
    const tabela = document.querySelector('#tabela-relatorio');
    if (!tabela) {
        showAlert('Tabela de relatório não encontrada.');
        return;
    }
    const htmlTabela = tabela.outerHTML.replace(/ /g, '%20');
    const nomeArquivo = 'relatorio-coletas.xls';
    const dataTipo = 'application/vnd.ms-excel';
    const link = document.createElement('a');
    link.href = 'data:' + dataTipo + ', ' + htmlTabela;
    link.download = nomeArquivo;
    link.click();
}