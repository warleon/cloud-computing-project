export type Stats = {
  total: number;
  active: number;
  pending: number;
  accounts: number;
};

export async function getStats(): Promise<Stats> {
  // simple mock - in future wire to real API
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
