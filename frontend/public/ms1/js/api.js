// API client placeholder migrated
class CustomerAPI {
    constructor(){ this.baseURL='http://localhost:3000/api'; }
    async getCustomers(){
        try{ const res = await fetch(`${this.baseURL}/customers`); return await res.json(); }catch(e){ return []; }
    }
}
window.CustomerAPI = CustomerAPI;
