import { Trophy } from "lucide-react";

const FOOTER_LINKS = [
    {
        title: "Platform",
        links: ["Horses", "Leaderboard", "Events"],
    },
    {
        title: "Support",
        links: ["Help Center", "Contact Us", "FAQ"],
    },
    {
        title: "Legal",
        links: ["Privacy", "Terms", "Cookies"],
    },
] as const;

export default function Footer() {

    return (
        <footer className="border-t border-border bg-muted/50">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-5 md:gap-12">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600">
                                <Trophy className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-lg font-bold text-foreground">
                                Alaman Baige
                            </span>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground">
                            Kazakhstan's premier horse racing platform. Track, compete, and celebrate excellence.
                        </p>
                    </div>

                    {FOOTER_LINKS.map((section) => (
                        <div key={section.title}>
                            <h3 className="font-semibold text-foreground">
                                {section.title}
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <button
                                            type="button"
                                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {link}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 border-t border-border pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-sm text-muted-foreground">
                            © 2026 Alaman Baige. All rights reserved.
                        </p>
                        <div className="flex gap-4">
                            <button type="button" className="text-muted-foreground transition-colors hover:text-foreground">
                                <span className="text-sm">f</span>
                            </button>
                            <button type="button" className="text-muted-foreground transition-colors hover:text-foreground">
                                <span className="text-sm">𝕏</span>
                            </button>
                            <button type="button" className="text-muted-foreground transition-colors hover:text-foreground">
                                <span className="text-sm">📷</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}