const ms1ApiFQDN =
  "http://cloud-computing-project-LB-1422038316.us-east-1.elb.amazonaws.com:5001";

export type Stats = {
  total: number;
  active: number;
  pending: number;
  accounts: number;
};

export async function getStats(): Promise<Stats> {
  // Try real API first, fallback to mock
  try {
    const res = await fetch(`${ms1ApiFQDN}/api/health`);
    if (res.ok) {
      const json = await res.json();
      return {
        total: json?.data?.total || 0,
        active: json?.data?.active || 0,
        pending: json?.data?.pending || 0,
        accounts: json?.data?.accounts || 0,
      } as Stats;
    }
  } catch (e) {
    // ignore and return mock
  }

  return new Promise<Stats>((resolve) =>
    setTimeout(
      () =>
        resolve({ total: 124, active: 98, pending: 6, accounts: 312 } as Stats),
      80
    )
  );
}

export type Customer = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  compliance?: string;
};

export async function listCustomers(): Promise<Customer[]> {
  // Try to fetch from backend, fallback to mock
  try {
    const res = await fetch(
      "http://cloud-computing-project-LB-1422038316.us-east-1.elb.amazonaws.com:5001/api/customers"
    );
    if (res.ok) {
      const json = await res.json();
      // backend returns { success, data: [...] }
      const list = json?.data || json || [];
      return list.map((c: any) => ({
        id: c.id || c._id,
        name: `${c.firstName || ""} ${c.lastName || ""}`.trim(),
        email: c.email,
        phone: c.phone,
        compliance: c.complianceStatus,
      }));
    }
  } catch (e) {
    // ignore and fallback to mock
  }

  return new Promise<Customer[]>((resolve) =>
    setTimeout(
      () =>
        resolve([
          {
            id: "1",
            name: "Juan Pérez",
            email: "juan.perez@example.com",
            phone: "+34123456789",
            compliance: "approved",
          },
          {
            id: "2",
            name: "María Gomez",
            email: "maria@example.com",
            phone: "+34111222333",
            compliance: "pending",
          },
        ]),
      120
    )
  );
}
