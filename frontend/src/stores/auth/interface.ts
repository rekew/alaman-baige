import type { UserProfile } from "@/entities/profile";

export interface AuthState {
  user: UserProfile | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
  fetchUser: () => Promise<UserProfile | null>;
  setUser: (user: UserProfile | null) => void;
  logout: () => void;
}
