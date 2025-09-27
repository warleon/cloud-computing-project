import React from 'react';

export default function Navbar(){
  return (
    <div className="ms1-nav">
      <div className="brand"><i className="fas fa-university"/> <span>BankCloud</span></div>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <i className="fas fa-user-circle" style={{fontSize:20}} />
          <div style={{textAlign:'right'}}><div style={{fontWeight:600}}>Admin</div><div style={{fontSize:12,color:'#e6eefb'}}>Administrador</div></div>
        </div>
      </div>
    </div>
  );
}
