import React, { useEffect, useState } from "react";
import { listCustomers, Customer } from "../service/mockApi";

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
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Detalle: {customer.name}</h3>
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
  useEffect(() => {
    listCustomers().then((c) => setCustomers(c));
  }, []);

  return (
    <div>
      <h2>Clientes</h2>
      <div className="search-row">
        <input
          placeholder="Buscar por nombre, email o teléfono"
          style={{
            flex: 1,
            padding: 8,
            borderRadius: 6,
            border: "1px solid #e6eefb",
          }}
        />
        <button
          className="btn btn-primary"
          onClick={() => alert("Nuevo cliente")}
        >
          Nuevo Cliente
        </button>
      </div>

      <table className="table">
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
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>
                <StatusBadge status={c.compliance} />
              </td>
              <td>
                <button className="btn" onClick={() => setSelected(c)}>
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CustomerModal customer={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
