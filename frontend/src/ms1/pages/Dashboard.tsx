import React, { useEffect, useState } from 'react';
import { getStats, Stats } from '../service/mockApi';

export default function Dashboard(){
  const [stats,setStats]=useState<Stats>({ total:0, active:0, pending:0, accounts:0 });
  useEffect(()=>{ getStats().then((s:Stats)=>setStats(s)); },[]);
  return (
    <div>
      <h2>Dashboard - Sistema de Clientes</h2>
      <div className="stat-grid">
        <div className="stat-card"><h3 id="total-customers">{stats.total}</h3><p>Total Clientes</p></div>
        <div className="stat-card"><h3 id="active-customers">{stats.active}</h3><p>Clientes Activos</p></div>
        <div className="stat-card"><h3 id="compliance-pending">{stats.pending}</h3><p>Compliance Pendiente</p></div>
        <div className="stat-card"><h3 id="linked-accounts">{stats.accounts}</h3><p>Cuentas Vinculadas</p></div>
      </div>
    </div>
  );
}
