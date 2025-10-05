const ms4ApiFQDN =
  "http://cloud-computing-project-LB-1422038316.us-east-1.elb.amazonaws.com:5004";

export type Rule = {
  id: string;
  name: string;
  description?: string;
  type: "amount_threshold" | "sanctions_list" | string;
  account?: string;
  threshold?: number | null;
};

export async function listRules(): Promise<Rule[]> {
  // Try real API first, fallback to mock
  try {
    const res = await fetch(`${ms4ApiFQDN}/api/v1/rules`);
    if (res.ok) {
      const json = await res.json();
      const list = json?.data || json || [];
      return list.map((r: any) => ({
        id: r.id || r._id,
        name: r.name,
        description: r.description,
        type: r.type,
        account: r.account,
        threshold: r.threshold,
      }));
    }
  } catch (e) {
    // ignore and return mock
  }

  return new Promise<Rule[]>((resolve) =>
    setTimeout(
      () =>
        resolve([
          {
            id: "r1",
            name: "Monto alto",
            description: "Regla que bloquea montos sobre el umbral",
            type: "amount_threshold",
            account: "acct-123",
            threshold: 10000,
          },
          {
            id: "r2",
            name: "Lista de sanciones",
            description: "Blacklist check",
            type: "sanctions_list",
            account: "",
            threshold: null,
          },
        ]),
      120
    )
  );
}
