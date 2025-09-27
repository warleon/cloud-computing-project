import React, { useState } from 'react';
import './App.css';
import './ms1/ms1.css';
import Navbar from './ms1/components/Navbar';
import Sidebar from './ms1/components/Sidebar';
import Dashboard from './ms1/pages/Dashboard';
import Customers from './ms1/pages/Customers';

export default function App(){
  const [view,setView]=useState<'dashboard'|'customers'|'reports'>('dashboard');
  return (
    <div>
      <Navbar />
      <div className="ms1-container">
        <Sidebar onNavigate={(s)=> setView(s as any)} />
        <main className="ms1-content">
          {view==='dashboard' && <Dashboard />}
          {view==='customers' && <Customers />}
          {view==='reports' && <div><h2>Reportes</h2><p>Próximamente</p></div>}
        </main>
      </div>
    </div>
  );
}
