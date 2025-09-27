// Main entry for MS1 static UI (migrated minimal)
document.addEventListener('DOMContentLoaded', ()=>{
    const api = new CustomerAPI();
    const ui = new UIManager();
    const manager = new CustomerManager(api, ui);
    window.customerManager = manager;
    if (document.getElementById('customers-tbody')) manager.loadCustomers();
});
