import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/";

export default function CommunitySection() {
    return (
        <section
            aria-labelledby="community-heading"
            className="py-16 sm:py-24"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-amber-500/10 to-amber-600/10 p-8 sm:p-16">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl" />

                    <div className="relative z-10 max-w-2xl">
                        <h2
                            id="community-heading"
                            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                        >
                            Join Our Community
                        </h2>

                        <p className="mt-4 text-lg text-muted-foreground">
                            Connect with horse enthusiasts, share racing insights,
                            and stay updated with the latest news from the Alaman
                            Baige community.
                        </p>

                        <Button
                            asChild
                            size="lg"
                            className="mt-8 gap-2"
                        >
                            <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MessageCircle className="h-5 w-5" />
                                Join WhatsApp Community
                            </a>
                        </Button>
                    </div>

                    <MessageCircle
                        aria-hidden="true"
                        className="absolute bottom-8 right-8 h-24 w-24 text-amber-500/10"
                    />
                </div>
            </div>
        </section>
    );
}