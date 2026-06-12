import { Link } from "@tanstack/react-router";
import { Home, Table2, User } from "lucide-react";

export default function AdminNavigationPanel() {
  const linkClass =
    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground";

  return (
    <header className="flex h-14 items-center border-b bg-background px-6">
      <nav className="flex gap-1">
        <Link to="/admin/home" className={linkClass}>
          <Home className="h-4 w-4" />
          Home
        </Link>

        <Link to="/tables" className={linkClass}>
          <Table2 className="h-4 w-4" />
          Tables
        </Link>
      </nav>

      <Link
        to="/profiles/me"
        className={`${linkClass} ml-auto`}
      >
        <User className="h-4 w-4" />
        Profile
      </Link>
    </header>
  );
}