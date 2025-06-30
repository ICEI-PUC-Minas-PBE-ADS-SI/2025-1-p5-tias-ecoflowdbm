// Front/assets/js/modules/domUtils.js
export function showLoading(loadingElement, buttonElement, buttonText) {
    if (loadingElement) loadingElement.style.display = 'block';
    if (buttonElement) {
        buttonElement.disabled = true;
        buttonElement.textContent = buttonText || 'Carregando...';
    }
}

export function hideLoading(loadingElement, buttonElement, buttonText) {
    if (loadingElement) loadingElement.style.display = 'none';
    if (buttonElement) {
        buttonElement.disabled = false;
        buttonElement.textContent = buttonText || 'Enviar';
    }
}

export function showAlert(message) {
    alert(message); // Você pode substituir por uma biblioteca de alerta mais bonita (ex: SweetAlert2)
}