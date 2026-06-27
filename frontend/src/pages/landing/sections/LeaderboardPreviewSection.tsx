import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trophy, ChevronRight, Star } from "lucide-react";

const MOCK_LEADERBOARD = [
    { rank: 1, name: "Berkut Ala", rating: 9.2, wins: 12 },
    { rank: 2, name: "Sultan", rating: 9.1, wins: 15 },
    { rank: 3, name: "Talgan", rating: 8.9, wins: 10 },
    { rank: 4, name: "Temirlan", rating: 8.8, wins: 11 },
    { rank: 5, name: "Aidar", rating: 8.7, wins: 8 },
];

function renderRank(rank: number) {
    switch (rank) {
        case 1:
            return <Trophy className="h-5 w-5 text-amber-500" />;

        case 2:
            return <Trophy className="h-5 w-5 text-slate-400" />;

        case 3:
            return <Trophy className="h-5 w-5 text-amber-700" />;

        default:
            return (
                <span className="text-sm font-semibold text-muted-foreground">
                    #{rank}
                </span>
            );
    }
}

export default function LeaderboardPreviewSection() {
    return (
        <section
            aria-labelledby="leaderboard-heading"
            className="bg-muted/50 py-16 sm:py-24"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h2
                        id="leaderboard-heading"
                        className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                    >
                        Leaderboard
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        Top performers in the 2026 racing season
                    </p>
                </div>

                <div className="overflow-hidden rounded-lg border border-border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead scope="col" className="px-6 py-4 text-sm font-semibold text-foreground">
                                    Rank
                                </TableHead>

                                <TableHead scope="col" className="px-6 py-4 text-sm font-semibold text-foreground">
                                    Horse
                                </TableHead>

                                <TableHead scope="col" className="px-6 py-4 text-sm font-semibold text-foreground">
                                    Rating
                                </TableHead>

                                <TableHead scope="col" className="px-6 py-4 text-sm font-semibold text-foreground">
                                    Wins
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {MOCK_LEADERBOARD.map((horse) => (
                                <TableRow key={horse.rank}>
                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {renderRank(horse.rank)}
                                        </div>
                                    </TableCell>

                                    <TableCell className="px-6 py-4 text-sm font-semibold text-foreground">
                                        {horse.name}
                                    </TableCell>

                                    <TableCell className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />

                                            <span className="text-sm font-semibold text-foreground">
                                                {horse.rating}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell className="px-6 py-4 text-sm font-semibold text-foreground">
                                        {horse.wins}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="mt-8">
                    <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                    >
                        View Full Leaderboard
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}