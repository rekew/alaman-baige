import { Button } from "@/components/ui/button";
import HorseCard from "@/pages/landing/cards/HorseCard";

const MOCK_HORSES = [
    {
        id: 1,
        name: "Berkut Ala",
        breed: "Akhal-Teke",
        age: 4,
        rating: 9.2,
        image: "🐴",
        wins: 12,
    },
    {
        id: 2,
        name: "Talgan",
        breed: "Thoroughbred",
        age: 5,
        rating: 8.9,
        image: "🐎",
        wins: 10,
    },
    {
        id: 3,
        name: "Aidar",
        breed: "Arabian",
        age: 3,
        rating: 8.7,
        image: "🐴",
        wins: 8,
    },
    {
        id: 4,
        name: "Sultan",
        breed: "Akhal-Teke",
        age: 6,
        rating: 9.1,
        image: "🐎",
        wins: 15,
    },
    {
        id: 5,
        name: "Amanai",
        breed: "Kazakh",
        age: 4,
        rating: 8.5,
        image: "🐴",
        wins: 9,
    },
    {
        id: 6,
        name: "Temirlan",
        breed: "Thoroughbred",
        age: 5,
        rating: 8.8,
        image: "🐎",
        wins: 11,
    },
];

export default function TopHorsesSection() {
    return (
        <section
            aria-labelledby="top-horses-heading"
            className="py-16 sm:py-24"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 flex items-end justify-between">
                    <div>
                        <h2
                            id="top-horses-heading"
                            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                        >
                            Top Horses
                        </h2>

                        <p className="mt-2 text-muted-foreground">
                            Featuring Kazakhstan&apos;s elite racing champions
                        </p>
                    </div>

                    <Button
                        variant="link"
                        className="hidden p-0 text-amber-600 hover:text-amber-700 sm:flex"
                    >
                        View All →
                    </Button>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {MOCK_HORSES.map((horse) => (
                        <HorseCard key={horse.id} {...horse} />
                    ))}
                </div>

                <div className="mt-8 flex sm:hidden">
                    <Button
                        variant="outline"
                        className="w-full"
                    >
                        View All Horses
                    </Button>
                </div>
            </div>
        </section>
    );
}