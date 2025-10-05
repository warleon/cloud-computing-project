import React, { useEffect, useState } from "react";
import { listRules, ms4ApiFQDN, Rule } from "../service/mockApi";

function Toast({
  items,
  onClose,
}: {
  items: { field?: string; message: string }[];
  onClose: () => void;
}) {
  if (!items || items.length === 0) return null;
  return (
    <div className="ms1-toast" role="alert" aria-live="assertive">
      <div className="ms1-toast-inner">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <strong>Errores de validación</strong>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Cerrar errores"
            style={{ width: 32, height: 32 }}
          >
            ×
          </button>
        </div>
        <ul style={{ marginTop: 8 }}>
          {items.map((it, idx) => (
            <li key={idx}>
              <strong>{it.field ? `${it.field}: ` : ""}</strong>
              {it.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TypeBadge({ type }: { type?: string }) {
  const cls =
    type === "amount_threshold"
      ? "status-badge approved"
      : type === "sanctions_list"
      ? "status-badge rejected"
      : "status-badge pending";
  return <span className={cls}>{type || "unknown"}</span>;
}

function RuleModal({
  rule,
  onClose,
}: {
  rule?: Rule | null;
  onClose: () => void;
}) {
  if (!rule) return null;
  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${rule.id}`}
    >
      <div className="modal">
        <button
          type="button"
          className="close-btn"
          aria-label="Cerrar"
          onClick={onClose}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h3 id={`modal-title-${rule.id}`}>Regla: {rule.name}</h3>
        <p>Tipo: {rule.type}</p>
        <p>Descripción: {rule.description}</p>
        <p>Cuenta: {rule.account}</p>
        {rule.threshold !== undefined && rule.threshold !== null && (
          <p>Umbral: {rule.threshold}</p>
        )}
        <div style={{ marginTop: 12 }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RulesPage() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [selected, setSelected] = useState<Rule | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [toastItems, setToastItems] = useState<
    { field?: string; message: string }[]
  >([]);
  const [toastTimer, setToastTimer] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const r: Rule[] = await listRules();
      setRules(r);
    })();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2 style={{ marginBottom: 4 }}>Reglas</h2>
          <p style={{ margin: 0, color: "var(--muted)" }}>
            Lista de reglas de compliance
          </p>
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => setShowNew(true)}>
            Nueva Regla
          </button>
        </div>
      </div>

      <table className="table" style={{ marginTop: 12 }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Cuenta</th>
            <th>Umbral</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((r) => (
            <tr
              key={r.id}
              style={{ transition: "background 160ms ease" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#fbfdff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <td style={{ fontWeight: 600 }}>{r.name}</td>
              <td>
                <TypeBadge type={r.type} />
              </td>
              <td style={{ color: "var(--muted)" }}>{r.account}</td>
              <td style={{ color: "var(--muted)" }}>{r.threshold ?? "-"}</td>
              <td>
                <button
                  className="btn ghost"
                  onClick={() => setSelected(r)}
                  style={{ padding: 8 }}
                >
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <RuleModal rule={selected} onClose={() => setSelected(null)} />
      <Toast items={toastItems} onClose={() => setToastItems([])} />

      {showNew && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-rule-title"
        >
          <div className="modal">
            <button
              type="button"
              className="close-btn"
              aria-label="Cerrar"
              onClick={() => setShowNew(false)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h3 id="new-rule-title">Nueva regla</h3>
            <NewRuleForm
              onCancel={() => setShowNew(false)}
              onCreate={(r) => {
                setRules((prev) => [r, ...prev]);
                setShowNew(false);
              }}
              showErrors={(errors: any[]) => {
                const items = (errors || []).map((e) => ({
                  field: e.field,
                  message: e.message,
                }));
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

function NewRuleForm({
  onCancel,
  onCreate,
  showErrors,
}: {
  onCancel: () => void;
  onCreate: (r: Rule) => void;
  showErrors?: (errors: any[]) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<string>("amount_threshold");
  const [account, setAccount] = useState("");
  const [threshold, setThreshold] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const errors: string[] = [];
    if (!name.trim()) errors.push("El nombre es obligatorio");
    if (!type) errors.push("El tipo es obligatorio");
    if (type === "amount_threshold" && !threshold.trim())
      errors.push("El umbral es obligatorio para el tipo de umbral");
    return errors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validate();
    if (errors.length) {
      alert(errors.join("\n"));
      return;
    }
    setSubmitting(true);

    const payload: any = {
      name: name.trim(),
      description: description.trim(),
      type,
      account: account.trim() || undefined,
    };
    if (type === "amount_threshold") {
      payload.threshold = parseFloat(threshold);
    }

    try {
      const res = await fetch(`${ms4ApiFQDN}/api/v1/rules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        const serverErrors = json?.errors;
        if (serverErrors && serverErrors.length && showErrors) {
          showErrors(serverErrors);
        } else {
          const msg =
            json?.message ||
            (serverErrors &&
              serverErrors.map((x: any) => x.message).join("\n")) ||
            "Error creando regla";
          alert(msg);
        }
        setSubmitting(false);
        return;
      }

      const created = json.data || json;
      const newRule: Rule = {
        id: created.id || created._id || `${Date.now()}`,
        name: created.name,
        description: created.description,
        type: created.type,
        account: created.account,
        threshold: created.threshold,
      } as any;

      onCreate(newRule);
      setSubmitting(false);
    } catch (err: any) {
      console.error("Create rule error", err);
      alert("Error al crear regla: " + (err.message || err));
      setSubmitting(false);
    }
  }

  return (
    <form
      className="customer-form"
      onSubmit={handleSubmit}
      style={{ padding: 16 }}
    >
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="rule-name">Nombre *</label>
          <input
            id="rule-name"
            className="input-large"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rule-type">Tipo *</label>
          <select
            id="rule-type"
            className="select-large"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="amount_threshold">Amount threshold</option>
            <option value="sanctions_list">Sanctions list</option>
          </select>
        </div>
        <div className="form-group full-width">
          <label htmlFor="rule-desc">Descripción</label>
          <input
            id="rule-desc"
            className="input-large"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rule-account">Cuenta</label>
          <input
            id="rule-account"
            className="input-large"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        </div>
        {type === "amount_threshold" && (
          <div className="form-group">
            <label htmlFor="rule-threshold">Umbral *</label>
            <input
              id="rule-threshold"
              className="input-large"
              type="number"
              step="0.01"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
            />
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          marginTop: 12,
        }}
      >
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Creando..." : "Crear Regla"}
        </button>
      </div>
    </form>
  );
}
