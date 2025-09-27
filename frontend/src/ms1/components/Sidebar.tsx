import React from "react";

export default function Sidebar({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  return (
    <aside className="ms1-sidebar">
      <div style={{ marginBottom: 18 }}>
        <h4 style={{ marginBottom: 6 }}>Panel</h4>
        <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <button className="btn" onClick={() => onNavigate("dashboard")}>
            Dashboard
          </button>
          <button className="btn" onClick={() => onNavigate("customers")}>
            Clientes
          </button>
          <button className="btn" onClick={() => onNavigate("reports")}>
            Reportes
          </button>
        </nav>
      </div>
    </aside>
  );
}
