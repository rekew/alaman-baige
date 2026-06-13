import { create } from "zustand";
import { getCurrentUser } from "@/pages/profile/api";
import { type AuthState } from "./interface";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "idle",

  fetchUser: async () => {
    set({ status: "loading" });
    try {
      const user = await getCurrentUser();
      console.log(`user:`, user)
      set({ user, status: "authenticated" });
      return user;
    } catch {
      set({ user: null, status: "unauthenticated" });
      return null;
    }
  },

  setUser: (user) =>
    set({ user, status: user ? "authenticated" : "unauthenticated" }),

  logout: () => set({ user: null, status: "unauthenticated" }),
}));
