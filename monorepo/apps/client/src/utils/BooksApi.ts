import axios from "axios";
import type { Book, BooksResponse } from "../types/BookTypes";

const api = axios.create({
  baseURL: "http://localhost:8089/api",
  headers: { "Content-Type": "application/json" }
});

export async function fetchBooks(): Promise<Book[]> {
  const { data } = await api.get<BooksResponse>("/books");
  return data.books;
}

export async function createBook(input: Omit<Book, "id">): Promise<Book> {
  const { data } = await api.post<Book>("/books", input);
  return data;
}

export async function updateBook(id: string, input: Omit<Book, "id">): Promise<Book> {
  const { data } = await api.put<Book>(`/books/${id}`, input);
  return data;
}

export async function deleteBook(id: string): Promise<void> {
  await api.delete(`/books/${id}`);
}
