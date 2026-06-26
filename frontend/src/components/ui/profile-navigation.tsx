import { Link } from "@tanstack/react-router";
import { Home, User } from "lucide-react";

export default function ProfileNavigationPanel() {
  const linkClass =
    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground";

  return (
    <header className="flex flex-wrap items-center justify-between border-b bg-background px-6 py-3">
      <div className="flex items-center gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Alaman Baige
          </p>
          <p className="text-base font-semibold text-foreground">Rider dashboard</p>
        </div>

        <nav className="flex flex-wrap gap-2">
          <Link to="/profile/home" className={linkClass}>
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link to="/profile/me" className={linkClass}>
            <User className="h-4 w-4" />
            Account
          </Link>
        </nav>
      </div>
    </header>
  );
}
