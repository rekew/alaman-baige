import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";

export interface EventCardProps {
  readonly id: number;
  readonly name: string;
  readonly date: string;
  readonly location: string;
  readonly description: string;
}

export default function EventCard({
  name,
  date,
  location,
  description,
}: EventCardProps) {
  return (
    <article className="h-full">
      <Card className="group h-full overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-amber-500/50">
        <div className="relative h-40 w-full bg-gradient-to-br from-amber-400/20 to-amber-600/20">
          <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-6xl">
            🏇
          </div>

          <div className="absolute right-3 top-3 rounded-lg bg-amber-600 px-3 py-1">
            <p className="text-xs font-semibold text-white">Featured</p>
          </div>
        </div>

        <CardContent className="space-y-4 p-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>

          <div className="space-y-2 border-t border-border pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar aria-hidden="true" className="h-4 w-4" />
              {date}
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin aria-hidden="true" className="h-4 w-4" />
              {location}
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t bg-transparent p-4">
          <Button type="button" variant="outline" className="w-full">
            Learn More
            <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </article>
  );
}
