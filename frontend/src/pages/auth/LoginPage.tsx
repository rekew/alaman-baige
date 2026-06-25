import { useState } from "react";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useStore } from "@/store/user-store/store";
import { loginUser } from "./api";

type LoginRequest = {
  phoneNumber: string;
  password: string;
};

function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<LoginRequest>({
    phoneNumber: "",
    password: "",
  });

  async function handleLoginSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      await loginUser(user);
      await useStore.getState().fetchUser();
      navigate({ to: "/profile/home" });
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_440px] lg:px-8">
        <div className="max-w-xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground">
            <ShieldCheck className="size-4 text-foreground" />
            Alaman Baige account
          </div>

          <h1 className="text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
            Welcome back
          </h1>

          <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
            Sign in to manage your profile and race activity.
          </p>

          <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-foreground">
                Secure access
              </p>
              <p className="mt-1">
                Sign in using your phone number and password.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-foreground">
                Continue where you left off
              </p>
              <p className="mt-1">
                Access your account and registrations.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-card-foreground">
              Login
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Enter your credentials to continue.
            </p>
          </div>

          <form
            className="space-y-4"
            onSubmit={handleLoginSubmit}
          >
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foreground">
                Phone Number
              </span>

              <div className="flex h-10 items-center gap-2 rounded-lg border border-input bg-background px-3 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
                <Phone className="size-4 text-muted-foreground" />

                <input
                  className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  placeholder="Your phone number"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={user.phoneNumber}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-foreground">
                Password
              </span>

              <input
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/50"
                placeholder="Your password"
                type="password"
                autoComplete="current-password"
                required
                value={user.password}
                onChange={(e) =>
                  setUser({
                    ...user,
                    password: e.target.value,
                  })
                }
              />
            </label>

            <Button
              className="mt-2 w-full"
              size="lg"
              type="submit"
            >
              Sign in
              <ArrowRight data-icon="inline-end" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a
              className="font-medium text-foreground underline-offset-4 hover:underline"
              href="/auth/register"
            >
              Create one
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
