import { useEffect, useState } from "react";

import { Activity, Trophy, Users, Zap } from "lucide-react";

import { statisticAPI } from "./api";

import type { IStatistics } from "./interface";

export default function StatisticsSection() {
    const [statistics, setStatistics] = useState<IStatistics | null>(null);

    useEffect(() => {
        async function loadStatistics() {
            const data = await statisticAPI.getStatistics();
            setStatistics(data);
        }

        loadStatistics();
    }, []);

    if (!statistics) {
        return null;
    }

    return (
        <section
            aria-labelledby="statistics-heading"
            className="border-y border-border bg-muted/50 py-16 sm:py-24"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 id="statistics-heading" className="sr-only">
                    Platform Statistics
                </h2>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <article className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-amber-500/50">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Total Horses
                                </p>

                                <p className="mt-2 text-3xl font-bold text-foreground">
                                    {statistics.totalHorses.toLocaleString()}
                                </p>
                            </div>

                            <div className="rounded-lg bg-amber-500/10 p-3">
                                <Activity
                                    aria-hidden="true"
                                    className="h-6 w-6 text-amber-600"
                                />
                            </div>
                        </div>
                    </article>

                    <article className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-amber-500/50">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Active Competitions
                                </p>

                                <p className="mt-2 text-3xl font-bold text-foreground">
                                    {statistics.activeCompetitions.toLocaleString()}
                                </p>
                            </div>

                            <div className="rounded-lg bg-amber-500/10 p-3">
                                <Trophy
                                    aria-hidden="true"
                                    className="h-6 w-6 text-amber-600"
                                />
                            </div>
                        </div>
                    </article>

                    <article className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-amber-500/50">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Registered Owners
                                </p>

                                <p className="mt-2 text-3xl font-bold text-foreground">
                                    {statistics.totalOwners.toLocaleString()}
                                </p>
                            </div>

                            <div className="rounded-lg bg-amber-500/10 p-3">
                                <Users
                                    aria-hidden="true"
                                    className="h-6 w-6 text-amber-600"
                                />
                            </div>
                        </div>
                    </article>

                    <article className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-amber-500/50">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Total Races
                                </p>

                                <p className="mt-2 text-3xl font-bold text-foreground">
                                    {statistics.totalRaces.toLocaleString()}
                                </p>
                            </div>

                            <div className="rounded-lg bg-amber-500/10 p-3">
                                <Zap
                                    aria-hidden="true"
                                    className="h-6 w-6 text-amber-600"
                                />
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}