import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, User } from "lucide-react";
import { useStore } from "@/store/user-store/store";
import ProfileNavigationPanel from "@/components/ui/profile-navigation";

export default function ProfileHomePage() {
  const user = useStore((state) => state.user);

  return (
    <main className="min-h-screen bg-background">
      <ProfileNavigationPanel />

      <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_440px] lg:px-8">
        <div className="max-w-xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground">
            <ShieldCheck className="size-4 text-foreground" />
            Main page
          </div>

          <h1 className="text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ""}.
          </h1>

          <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
            This is your main page after login. Use the navigation bar to view your profile and manage your account.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Link
              to="/profile/me"
              className="rounded-3xl border border-border bg-card p-6 no-underline transition hover:border-ring hover:bg-muted"
            >
              <div className="flex items-center gap-3 text-foreground">
                <User className="h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">Account settings</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Review and update your account details.
                  </p>
                </div>
              </div>
            </Link>

            <div className="rounded-3xl border border-border bg-card p-6">
              <p className="text-sm font-medium text-foreground">Account summary</p>
              <p className="mt-4 text-sm text-muted-foreground">
                {user ? (
                  <>
                    <span className="block">Role: {user.role}</span>
                    <span className="block">Phone: {user.phoneNumber}</span>
                  </>
                ) : (
                  "Loading your account details..."
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="mb-4">
            <p className="text-sm font-medium text-foreground">What’s next?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Use the navigation bar at the top to move between your dashboard and account page.
            </p>
          </div>

          <div className="space-y-3">
            <div className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground">
              New feature coming soon: race registrations and activity tracking.
            </div>

            <Link
              to="/profile/me"
              className="flex items-center justify-between rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              <span>Open account</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
