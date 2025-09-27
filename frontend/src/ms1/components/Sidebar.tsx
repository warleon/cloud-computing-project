import React, { useState } from "react";

export default function Sidebar({
  onNavigate,
}: {
  onNavigate: (s: string) => void;
}) {
  const [active, setActive] = useState("dashboard");
  function nav(to: string) {
    setActive(to);
    onNavigate(to);
  }

  return (
    <aside className="ms1-sidebar">
      <div className="sidebar-logo">
        <div style={{ fontWeight: 800, fontSize: 16 }}>BankCloud</div>
        <div style={{ color: "var(--muted)", fontSize: 12 }}>Panel</div>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 8 }} aria-label="Principal">
        <button type="button" className={`sidebar-btn ${active === "dashboard" ? "active" : ""}`} onClick={() => nav("dashboard")}>
          <span className="icon">
            <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8V3h-8zM3 21h8v-6H3v6z" fill="currentColor" />
            </svg>
          </span>
          <span>Dashboard</span>
        </button>

        <button type="button" className={`sidebar-btn ${active === "customers" ? "active" : ""}`} onClick={() => nav("customers")}>
          <span className="icon">
            <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zM2 20c0-3.313 4.03-6 10-6s10 2.687 10 6v1H2v-1z" fill="currentColor" />
            </svg>
          </span>
          <span>Clientes</span>
        </button>

        <button type="button" className={`sidebar-btn ${active === "reports" ? "active" : ""}`} onClick={() => nav("reports")}>
          <span className="icon">
            <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 3h18v2H3V3zm0 4h12v2H3V7zm0 4h18v6H3v-6z" fill="currentColor" />
            </svg>
          </span>
          <span>Reportes</span>
        </button>
      </nav>
    </aside>
  );
}
