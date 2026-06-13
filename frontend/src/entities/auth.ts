import { type UserProfile } from "./profile";

export interface RegisterRequest {
    firstName: string;
    surname: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}

export interface LoginRequest {
    phoneNumber: string;
    password: string;
}

export interface AuthUser extends UserProfile {
  role: "admin" | "user";
}
