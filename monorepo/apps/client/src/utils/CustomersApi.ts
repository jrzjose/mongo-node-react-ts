
import axios from "axios";
import type { Customer, CustomersResponse } from "../types/CustomersTypes";

const api = axios.create({
  baseURL: "http://localhost:8089/api",
  headers: { "Content-Type": "application/json" }
});

export async function listCustomers(): Promise<CustomersResponse> {
  const {data} = await api.get<CustomersResponse>("/customers");
  return data.customers;
}

export async function createCustomer(input: Omit<Customer, "_id">): Promise<Customer> {
  const { data } = await api.post<Customer>("/customers", input);
  return data;
}

export async function updateCustomer(id: string, input: Omit<Customer, "_id">): Promise<Customer> {
  const { data } = await api.put<Customer>(`/customers/${id}`, input);
  return data;
}

export async function deleteCustomer(id: string): Promise<void> {
  await api.delete(`/customers/${id}`);
}
``
