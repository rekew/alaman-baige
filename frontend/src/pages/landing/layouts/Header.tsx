import { useMemo, useState } from "react";
import { Trophy, MessageCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = ["Home", "Horses", "Leaderboard", "Events", "Profile"] as const;

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = useMemo(
        () => NAV_ITEMS.map((label) => ({ label })),
        []
    );

    return (
        <header className="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600">
                        <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-foreground">Alaman Baige</span>
                </div>

                <div className="hidden items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        asChild
                        variant="default"
                        size="sm"
                        className="hidden gap-2 sm:flex"
                    >
                        <a
                            href="https://wa.me/"
                            target="_blank"
                            rel="noreferrer"
                        >
                        <MessageCircle className="h-4 w-4" />
                            Community
                        </a>
                    </Button>

                    <button
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </nav>

            {mobileMenuOpen && (
                <div className="border-t border-border bg-background px-4 py-4 md:hidden">
                    <div className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <button
                                key={item.label}
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {item.label}
                            </button>
                        ))}
                        <Button asChild variant="default" className="w-full gap-2">
                            <a
                                href="https://wa.me/"
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <MessageCircle className="h-4 w-4" />
                                Join Community
                            </a>
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}