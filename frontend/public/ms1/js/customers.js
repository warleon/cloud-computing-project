// CustomerManager (migrated subset)
class CustomerManager {
    constructor(api, ui) { this.api = api; this.ui = ui; }
    async loadCustomers(){
        const tbody = document.getElementById('customers-tbody');
        if (!tbody) return;
        tbody.innerHTML = `<tr><td colspan="7">Cargando...</td></tr>`;
        try{
            const res = await fetch('http://localhost:3000/api/customers');
            const data = await res.json();
            tbody.innerHTML = data.length ? data.map(c=>`<tr><td>${c.firstName||c.name||'Cliente'}</td><td>${c.email||''}</td><td>${c.phone||''}</td><td>--</td><td>0</td><td>--</td><td>--</td></tr>`).join('') : `<tr><td colspan="7">No hay clientes</td></tr>`;
        }catch(e){ console.error(e); tbody.innerHTML = `<tr><td colspan="7">Error al cargar</td></tr>`; }
    }
}
window.CustomerManager = CustomerManager;
