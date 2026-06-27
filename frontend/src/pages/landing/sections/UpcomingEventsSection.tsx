import EventCard from "@/pages/landing/cards/EventCard";

const MOCK_EVENTS = [
    {
        id: 1,
        name: "Summer Championship 2026",
        date: "July 15, 2026",
        location: "Almaty Hippodrome",
        description:
            "Major racing championship featuring Kazakhstan's top horses.",
    },
    {
        id: 2,
        name: "Northern Regional Sprint",
        date: "July 22, 2026",
        location: "Akmola Province",
        description:
            "Regional competition for emerging talent and local champions.",
    },
    {
        id: 3,
        name: "Youth Riders Cup",
        date: "August 5, 2026",
        location: "Astana Racing Complex",
        description:
            "Dedicated event showcasing the next generation of horse racing.",
    },
];

export default function UpcomingEventsSection() {
    return (
        <section
            aria-labelledby="upcoming-events-heading"
            className="py-16 sm:py-24"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2
                        id="upcoming-events-heading"
                        className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                    >
                        Upcoming Events
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        Don&apos;t miss the biggest racing events this season
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {MOCK_EVENTS.map((event) => (
                        <EventCard key={event.id} {...event} />
                    ))}
                </div>
            </div>
        </section>
    );
}