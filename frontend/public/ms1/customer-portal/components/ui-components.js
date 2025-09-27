// small UIComponents for portal
class UIComponents{ static showToast(m,t){ const container=document.getElementById('toast-container'); if(!container) return; const el=document.createElement('div'); el.textContent=m; container.appendChild(el); setTimeout(()=>el.remove(),3000);} }
window.UIComponents = UIComponents;
