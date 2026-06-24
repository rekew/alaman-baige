import { create } from 'zustand';
import type { AuthUser } from '@/entities/auth';
import { getCurrentUser } from '../../pages/profile/api';
import { toast } from 'sonner';

interface UserStore {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
}

export const useStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user: AuthUser) => set({ user }),
    fetchUser: async () => {
        try {
            const data = await getCurrentUser();
            set({ user: data });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            toast.error(`Failed to fetch user: ${message}`);
        }
    },
    clearUser: () => set({ user: null }),
}));