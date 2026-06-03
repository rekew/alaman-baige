import { useState } from "react";
import { ArrowRight, Phone, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RegisterRequest } from "@/entities/auth";
import { registerUser } from "./api";

function RegisterPage() {
  async function handleRegisterSubmit(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await registerUser(user);
  }

  const [user, setUser] = useState<RegisterRequest>({
    firstName: "",
    surname: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_440px] lg:px-8">
        <div className="max-w-xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground">
            <ShieldCheck className="size-4 text-foreground" />
            Alaman Baige account
          </div>

          <h1 className="text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
            Create your account
          </h1>

          <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
            Join the platform, manage your profile, and keep your race activity
            in one secure place.
          </p>

          <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-foreground">Fast onboarding</p>
              <p className="mt-1">
                A short form now, richer profile data later.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium text-foreground">Secure by default</p>
              <p className="mt-1">Password confirmation keeps mistakes low.</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-card-foreground">
              Register
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your details to create a new account.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleRegisterSubmit}>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foreground">
                First Name
              </span>
              <div className="flex h-10 items-center gap-2 rounded-lg border border-input bg-background px-3 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
                <UserRound className="size-4 text-muted-foreground" />
                <input
                  className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  name="firstName"
                  placeholder="Your first name"
                  type="text"
                  autoComplete="firstName"
                  required
                  value={user.firstName}
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-foreground">
                Surname
              </span>
              <div className="flex h-10 items-center gap-2 rounded-lg border border-input bg-background px-3 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
                <UserRound className="size-4 text-muted-foreground" />
                <input
                  className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  name="surname"
                  placeholder="Your surname"
                  type="text"
                  autoComplete="surname"
                  required
                  value={user.surname}
                  onChange={(e) => setUser({ ...user, surname: e.target.value })}
                />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-foreground">Phone Number</span>
              <div className="flex h-10 items-center gap-2 rounded-lg border border-input bg-background px-3 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
                <Phone className="size-4 text-muted-foreground" />
                <input
                  className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  name="phone number"
                  placeholder="Your phone number"
                  type="tel"
                  autoComplete="phone number"
                  required
                  value={user.phoneNumber}
                  onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-foreground">
                Password
              </span>
              <input
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/50"
                name="password"
                placeholder="Create a password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-foreground">
                Confirm password
              </span>
              <input
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/50"
                name="confirmPassword"
                placeholder="Repeat your password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={user.confirmPassword}
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              />
            </label>

            <Button className="mt-2 w-full" size="lg" type="submit">
              Create account
              <ArrowRight data-icon="inline-end" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              className="font-medium text-foreground underline-offset-4 hover:underline"
              href="/auth/login"
            >
              Sign in
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;
