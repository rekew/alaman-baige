import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRouter,
} from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

import { Toaster } from "sonner";

import { useStore } from "@/store/user-store/store";
import { type AuthUser } from "@/entities/auth";

import "./index.css";

export interface RouterContext {
  auth: {
    isAuthenticated: boolean;
    role?: string;
  };
}

const router = createRouter({
  routeTree,

  context: {
    auth: {
      isAuthenticated: false,
      role: undefined,
    },
  } satisfies RouterContext,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

async function bootstrap() {
  try {
    await useStore.getState().fetchUser();
  } catch {
    console.log("User not authenticated");
  }

  const user: AuthUser | null = useStore.getState().user;

  ReactDOM.createRoot(
    document.getElementById("root")!,
  ).render(
    <StrictMode>
      <>
        <RouterProvider
          router={router}
          context={{
            auth: {
              isAuthenticated: !!user,
              role: user?.role,
            },
          }}
        />

        <Toaster
          position="top-right"
          richColors
          closeButton
          expand
          duration={4000}
        />
      </>
    </StrictMode>,
  );
}

bootstrap();