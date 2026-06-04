import { useState } from "react";
import { ArrowRight, Lock, Phone, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LoginRequest } from "@/entities/auth";
import { loginAdmin } from "./api";

function AdminLoginPage() {
  const [credentials, setCredentials] = useState<LoginRequest>({
    phoneNumber: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await loginAdmin(credentials);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_440px] lg:px-8">
        <div className="max-w-xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground">
            <ShieldAlert className="size-4 text-foreground" />
            Alaman Baige — Admin Portal
          </div>

          <h1 className="text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
            Admin access only
          </h1>

          <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
            This area is restricted to authorized administrators. All activity
            is logged and monitored.
          </p>

          <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-foreground">Restricted access</p>
              <p className="mt-1">
                Only accounts with admin privileges can sign in here.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-foreground">Activity logging</p>
              <p className="mt-1">
                All admin sessions are recorded for security auditing.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-card-foreground">
              Sign in
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your admin credentials to continue.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foreground">
                Phone Number
              </span>
              <div className="flex h-10 items-center gap-2 rounded-lg border border-input bg-background px-3 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
                <Phone className="size-4 text-muted-foreground" />
                <input
                  className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  name="phoneNumber"
                  placeholder="Your phone number"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={credentials.phoneNumber}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
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
              <div className="flex h-10 items-center gap-2 rounded-lg border border-input bg-background px-3 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
                <Lock className="size-4 text-muted-foreground" />
                <input
                  className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  name="password"
                  placeholder="Your password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
              </div>
            </label>

            {error && (
              <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <Button
              className="mt-2 w-full"
              size="lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign in"}
              {!loading && <ArrowRight data-icon="inline-end" />}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Not an admin?{" "}
            <a
              className="font-medium text-foreground underline-offset-4 hover:underline"
              href="/auth/login"
            >
              Go to user login
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

export default AdminLoginPage;
