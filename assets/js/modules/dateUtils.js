// Front/assets/js/modules/dateUtils.js
export function formatarData(data) {
  return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR');
}

export function formatarDataHora(dataHora) {
  return new Date(dataHora).toLocaleString('pt-BR');
}