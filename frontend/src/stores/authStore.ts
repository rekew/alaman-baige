import type { UserProfile } from "@/entities/profile";
import { create } from "zustand";

export const useAuthStore = create<UserProfile>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  logout: () => set({ user: null }),
}));