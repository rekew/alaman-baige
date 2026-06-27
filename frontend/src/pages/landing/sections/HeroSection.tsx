import { Button } from "@/components/ui/button";
import { ChevronRight, Trophy } from "lucide-react";

const HERO_TITLE = "Track Kazakhstan's";
const HERO_HIGHLIGHT = "Best Horses";

const HERO_DESCRIPTION =
    "Explore racing performance, compete with elite riders, and join the fastest-growing horse racing community in Central Asia.";

export default function HeroSection() {
    return (
        <section
            aria-labelledby="hero-heading"
            className="relative min-h-screen w-full bg-gradient-to-b from-background via-background to-muted pt-24"
        >
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 overflow-hidden"
            >
                <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 md:grid-cols-2 md:gap-8">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1
                                id="hero-heading"
                                className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl"
                            >
                                {HERO_TITLE}{" "}
                                <span className="text-amber-600">
                                    {HERO_HIGHLIGHT}
                                </span>
                            </h1>

                            <p className="text-lg text-muted-foreground md:text-xl">
                                {HERO_DESCRIPTION}
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Button size="lg" className="gap-2">
                                Browse Horses
                                <ChevronRight className="h-5 w-5" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="gap-2"
                            >
                                View Leaderboard
                                <Trophy className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="relative h-96 w-full max-w-sm">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 blur-2xl" />

                            <div className="relative flex h-full items-center justify-center rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-amber-600/10 p-8">
                                <div
                                    aria-hidden="true"
                                    className="text-9xl select-none"
                                >
                                    🐎
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}