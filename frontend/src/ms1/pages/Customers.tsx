import React, { useEffect, useState } from "react";
import { listCustomers, Customer } from "../service/mockApi";

function Toast({ items, onClose }: { items: { field?: string; message: string }[]; onClose: () => void }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="ms1-toast" role="alert" aria-live="assertive">
      <div className="ms1-toast-inner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong>Errores de validación</strong>
          <button className="close-btn" onClick={onClose} aria-label="Cerrar errores" style={{ width:32, height:32 }}>
            ×
          </button>
        </div>
        <ul style={{ marginTop: 8 }}>
          {items.map((it, idx) => (
            <li key={idx}><strong>{it.field ? `${it.field}: ` : ''}</strong>{it.message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status?: string }) {
  const cls =
    status === "approved"
      ? "status-badge approved"
      : status === "pending"
      ? "status-badge pending"
      : "status-badge rejected";
  return <span className={cls}>{status || "unknown"}</span>;
}

function CustomerModal({
  customer,
  onClose,
}: {
  customer?: Customer | null;
  onClose: () => void;
}) {
  if (!customer) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby={`modal-title-${customer.id}`}>
      <div className="modal">
        <button type="button" className="close-btn" aria-label="Cerrar" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h3 id={`modal-title-${customer.id}`}>Detalle: {customer.name}</h3>
        <p>Email: {customer.email}</p>
        <p>Tel: {customer.phone}</p>
        <div style={{ marginTop: 12 }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selected, setSelected] = useState<Customer | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [toastItems, setToastItems] = useState<{ field?: string; message: string }[]>([]);
  const [toastTimer, setToastTimer] = useState<any>(null);
  useEffect(() => {
    listCustomers().then((c) => setCustomers(c));
  }, []);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ marginBottom: 4 }}>Clientes</h2>
          <p style={{ margin: 0, color: "var(--muted)" }}>Lista de clientes y estado de compliance</p>
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => setShowNew(true)}>Nuevo Cliente</button>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        {/* CTA row similar to image: large inputs and a primary 'Empezar' button */}
        <div className="cta-row">
          <input className="input-large" placeholder="Ingresa tu monto" />
          <select className="select-large">
            <option>Fecha de pago</option>
            <option>Hoy</option>
            <option>Próxima semana</option>
          </select>
          <button className="btn-cta">Empezar</button>
        </div>
        <div style={{ marginTop: 8 }}>
          <small style={{ color: 'var(--muted)' }}><span style={{marginRight:8}}>🕒</span>Horario de atención: Lun a Dom de 5:00am - 12:00am (medianoche)</small>
        </div>
      </div>

      <table className="table" style={{ marginTop: 12 }}>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Email</th>
            <th>Tel</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} style={{ transition: "background 160ms ease" }} onMouseEnter={e => (e.currentTarget.style.background = "#fbfdff")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              <td style={{ fontWeight: 600 }}>{c.name}</td>
              <td style={{ color: "var(--muted)" }}>{c.email}</td>
              <td style={{ color: "var(--muted)" }}>{c.phone}</td>
              <td>
                <StatusBadge status={c.compliance} />
              </td>
              <td>
                <button className="btn ghost" onClick={() => setSelected(c)} style={{ padding: 8 }}>Ver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CustomerModal customer={selected} onClose={() => setSelected(null)} />
  <Toast items={toastItems} onClose={() => setToastItems([])} />
      {showNew && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="new-customer-title">
          <div className="modal">
            <button type="button" className="close-btn" aria-label="Cerrar" onClick={() => setShowNew(false)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h3 id="new-customer-title">Nuevo cliente</h3>
                  <NewCustomerForm
                    onCancel={() => setShowNew(false)}
                    onCreate={(c) => {
                      // prepend to list
                      setCustomers((prev) => [c, ...prev]);
                      setShowNew(false);
                    }}
                    showErrors={(errors: any[]) => {
                      // map backend errors to toast items
                      const items = (errors || []).map(e => ({ field: e.field, message: e.message }));
                      setToastItems(items);
                      if (toastTimer) clearTimeout(toastTimer);
                      const t = setTimeout(() => setToastItems([]), 8000);
                      setToastTimer(t);
                    }}
                  />
          </div>
        </div>
      )}
    </div>
  );
}

function NewCustomerForm({ onCancel, onCreate, showErrors }: { onCancel: () => void; onCreate: (c: Customer) => void; showErrors?: (errors: any[]) => void }) {
  // Collect the fields required by the MS1 create customer validator
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(''); // YYYY-MM-DD
  const [nationalId, setNationalId] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateField, setStateField] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Colombia');
  const [status, setStatus] = useState<'approved' | 'pending' | 'inactive'>('pending');
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const errors: string[] = [];
    if (!firstName.trim()) errors.push('El nombre es obligatorio');
    if (!lastName.trim()) errors.push('El apellido es obligatorio');
    if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push('Email inválido');
    if (!phone.trim()) errors.push('Teléfono es obligatorio');
    if (!dateOfBirth.trim()) errors.push('Fecha de nacimiento es obligatoria');
    if (!nationalId.trim()) errors.push('Número de identificación es obligatorio');
    if (!street.trim() || !city.trim() || !stateField.trim() || !postalCode.trim()) errors.push('Dirección incompleta');
    return errors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validate();
    if (errors.length) {
      alert(errors.join('\n'));
      return;
    }

    setSubmitting(true);

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      dateOfBirth: dateOfBirth, // YYYY-MM-DD acceptable by Joi
      nationalId: nationalId.trim(),
      address: {
        street: street.trim(),
        city: city.trim(),
        state: stateField.trim(),
        postalCode: postalCode.trim(),
        country: country.trim() || 'Colombia'
      }
      // Note: createCustomerSchema does not accept complianceStatus/status in the current validator
    };

    try {
  const res = await fetch('http://cloud-computing-project-LB-1422038316.us-east-1.elb.amazonaws.com:5001/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        // Show server validation or message
        const serverErrors = json?.errors;
        if (serverErrors && serverErrors.length && showErrors) {
          showErrors(serverErrors);
        } else {
          const msg = json?.message || (serverErrors && serverErrors.map((x: any) => x.message).join('\n')) || 'Error creating customer';
          alert(msg);
        }
        setSubmitting(false);
        return;
      }

      // MS1 sendSuccess wraps created record in `data` field
      const created = json.data || json;

      // Map server response to local Customer shape for list rendering
      const newCustomer: Customer = {
        id: created.id || created._id || `${Date.now()}`,
        name: `${created.firstName || firstName} ${created.lastName || lastName}`.trim(),
        email: created.email,
        phone: created.phone,
        compliance: created.complianceStatus || status,
      };

      onCreate(newCustomer);
      setSubmitting(false);
    } catch (err: any) {
      console.error('Create customer error', err);
      alert('Error al crear cliente: ' + (err.message || err));
      setSubmitting(false);
    }
  }

  return (
    <form className="customer-form" onSubmit={handleSubmit} style={{ padding: 16 }}>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="first-name">Nombre *</label>
          <input className="input-large" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="last-name">Apellido *</label>
          <input className="input-large" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="new-email">Email *</label>
          <input className="input-large" id="new-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="new-phone">Teléfono *</label>
          <input className="input-large" id="new-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Fecha de Nacimiento *</label>
          <input className="input-large" id="dob" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="national-id">Número de Identificación *</label>
          <input className="input-large" id="national-id" value={nationalId} onChange={(e) => setNationalId(e.target.value)} />
        </div>

        <div className="form-group full-width">
          <label htmlFor="street">Calle / Dirección *</label>
          <input className="input-large" id="street" value={street} onChange={(e) => setStreet(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="city">Ciudad *</label>
          <input className="input-large" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="state">Departamento / Estado *</label>
          <input className="input-large" id="state" value={stateField} onChange={(e) => setStateField(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="postal">Código Postal *</label>
          <input className="input-large" id="postal" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="country">País</label>
          <input className="input-large" id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="new-status">Estado (visual)</label>
          <select className="select-large" id="new-status" value={status} onChange={(e) => setStatus(e.target.value as any)}>
            <option value="approved">Aprobado</option>
            <option value="pending">Pendiente</option>
            <option value="inactive">Anulado</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={submitting}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Creando...' : 'Crear Cliente'}
        </button>
      </div>
    </form>
  );
}
