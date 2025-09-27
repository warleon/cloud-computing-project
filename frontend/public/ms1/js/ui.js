// UI Utilities (migrated subset)
class UIManager {
    constructor() {
        this.toastContainer = document.getElementById('toast-container');
        this.loadingOverlay = document.getElementById('loading-overlay');
    }
    showLoading(message = 'Procesando...') {
        const overlay = this.loadingOverlay;
        const text = overlay?.querySelector('p');
        if (text) text.textContent = message;
        overlay?.classList.add('active');
    }
    hideLoading() { this.loadingOverlay?.classList.remove('active'); }
    showToast(message, type='info', duration=5000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class="fas fa-info-circle"></i><div><strong>${type}</strong><p>${message}</p></div>`;
        this.toastContainer?.appendChild(toast);
        setTimeout(()=> toast.remove(), duration);
    }
}
window.UIManager = UIManager;
