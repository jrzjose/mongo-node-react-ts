import axios from "axios";
import type { Contest, ContestsResponse } from "../types/ContestTypes";

const api = axios.create({
  baseURL: "http://localhost:8089/api",
  headers: { "Content-Type": "application/json" }
});

export async function fetchContests(): Promise<Contest[]> {
  const { data } = await api.get<ContestsResponse>("/contests");
  return data.contests;
}

export async function createContest(input: Omit<Contest, "id">): Promise<Contest> {
  const { data } = await api.post<Contest>("/contests", input);
  return data;
}

export async function updateContest(id: string, input: Omit<Contest, "id">): Promise<Contest> {
  const { data } = await api.put<Contest>(`/contests/${id}`, input);
  return data;
}

export async function deleteContest(id: string): Promise<void> {
  await api.delete(`/contests/${id}`);
}
