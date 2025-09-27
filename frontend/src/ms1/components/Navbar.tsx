import React from "react";

export default function Navbar() {
  return (
    <header className="ms1-nav">
      <div className="brand">
        <svg className="logo-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="white" opacity="0.06" />
          <path d="M4 12h16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
          <path d="M6 8h12" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        </svg>
        <span>BankCloud</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div className="user-chip">
          <div className="user-avatar" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" fill="#fff" opacity="0.9" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
            </svg>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 600 }}>Admin</div>
            <div style={{ fontSize: 12, color: "rgba(230,238,251,0.9)" }}>Administrador</div>
          </div>
        </div>
      </div>
    </header>
  );
}
