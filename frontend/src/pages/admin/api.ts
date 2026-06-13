import { api } from "@/app/api";
import type { LoginRequest } from "@/entities/auth";


export async function loginAdmin(data: LoginRequest) {
  return api.post("/auth/login/admin", data);
}