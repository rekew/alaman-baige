import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/auth/authStore";

export const Route = createFileRoute("/_protected")({
  beforeLoad: async () => {
    const store = useAuthStore.getState();

    if (store.status === "idle") {
      await store.fetchUser();
    }

    if (useAuthStore.getState().user?.role !== "admin") {
      throw redirect({
        to: "/auth/login",
      });
    }
  },
  component: Outlet,
});
