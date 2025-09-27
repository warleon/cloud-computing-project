// Minimal customer portal app (migrated subset)
class CustomerApp {
    constructor(){ this.api = { getCustomer: async ()=> ({ firstName:'Juan', lastName:'Pérez', email:'juan.perez@example.com', phone:'+34123456789' }) } }
    async init(){
        const data = await this.api.getCustomer();
        document.getElementById('welcome-name').textContent = data.firstName;
        document.getElementById('user-name').textContent = `${data.firstName} ${data.lastName}`;
        document.getElementById('user-avatar').textContent = data.firstName.charAt(0)+data.lastName.charAt(0);
    }
}
window.addEventListener('DOMContentLoaded', ()=>{ const app=new CustomerApp(); app.init(); window.customerApp=app; });
