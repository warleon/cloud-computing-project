import React, { useEffect, useState } from "react";
import { getStats, Stats } from "../service/mockApi";

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    active: 0,
    pending: 0,
    accounts: 0,
  });
  useEffect(() => {
    getStats().then((s: Stats) => setStats(s));
  }, []);
  return (
    <div>
      <h2 style={{ marginBottom: 12 }}>Dashboard</h2>
      <p style={{ marginTop: 0, color: "var(--muted)", marginBottom: 18 }}>Resumen rápido del sistema</p>

      <div className="stat-grid">
        <div className="stat-card" style={{ transition: "transform 260ms ease", willChange: "transform" }}>
          <h3 id="total-customers" style={{ margin: 0, fontSize: 28 }}>{stats.total}</h3>
          <p style={{ marginTop: 8, color: "var(--muted)" }}>Total Clientes</p>
        </div>
        <div className="stat-card" style={{ transition: "transform 260ms ease", willChange: "transform" }}>
          <h3 id="active-customers" style={{ margin: 0, fontSize: 28 }}>{stats.active}</h3>
          <p style={{ marginTop: 8, color: "var(--muted)" }}>Clientes Activos</p>
        </div>
        <div className="stat-card" style={{ transition: "transform 260ms ease", willChange: "transform" }}>
          <h3 id="compliance-pending" style={{ margin: 0, fontSize: 28 }}>{stats.pending}</h3>
          <p style={{ marginTop: 8, color: "var(--muted)" }}>Compliance Pendiente</p>
        </div>
        <div className="stat-card" style={{ transition: "transform 260ms ease", willChange: "transform" }}>
          <h3 id="linked-accounts" style={{ margin: 0, fontSize: 28 }}>{stats.accounts}</h3>
          <p style={{ marginTop: 8, color: "var(--muted)" }}>Cuentas Vinculadas</p>
        </div>
      </div>
    </div>
  );
}
