import { api } from "@/app/api";
import type { LoginRequest, RegisterRequest } from "@/entities/auth";

export const registerUser = async (payload: RegisterRequest) => {
    try {
        await api.post("/auth/register", payload);
    } catch (error) {
        console.error("Registration failed:", error);
        throw error;
    }
}

export async function loginUser(data: LoginRequest) {
  return api.post("/auth/login", data);
}
