import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useStore } from "@/store/user-store/store";

export const Route = createFileRoute(
    "/_protected/admin",
)({
    beforeLoad: async () => {
        const store = useStore.getState();

        if (!store.user) {
            await store.fetchUser().catch(() => undefined);
        }

        const user = useStore.getState().user;

        if (!user || user.role !== "admin") {
            throw redirect({
                to: "/auth/admin",
            });
        }
    },

    component: () => <Outlet />,
});
