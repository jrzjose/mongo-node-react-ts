export interface Address {
  street: string;
  city: string;
  zip: string;
}

export interface Customer {
  customer: string;
  email: string;
  address: Address;
  joinDate: string;         // ISO-8601 string, e.g. "2025-01-01T10:00:00Z"
}


export interface CustomersResponse {
  customers: Customer[];
}