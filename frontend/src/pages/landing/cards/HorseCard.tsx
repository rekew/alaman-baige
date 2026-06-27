import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";

export interface HorseCardProps {
  readonly id: number;
  readonly name: string;
  readonly breed: string;
  readonly age: number;
  readonly rating: number;
  readonly image: string;
  readonly wins: number;
}

export default function HorseCard({
  name,
  breed,
  age,
  rating,
  image,
  wins,
}: HorseCardProps) {
  return (
    <article className="h-full">
      <Card className="group h-full overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-amber-500/50">
        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-amber-400/10 to-amber-600/10">
          <div aria-hidden="true" className="flex h-full items-center justify-center text-8xl">
            {image}
          </div>

          <div className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 backdrop-blur">
            <div className="flex items-center gap-1 text-sm font-semibold text-amber-300">
              <Star aria-hidden="true" className="h-4 w-4 fill-amber-300" />
              {rating}
            </div>
          </div>
        </div>

        <CardContent className="space-y-4 p-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{breed}</p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Age</p>
              <p className="text-lg font-semibold text-foreground">{age}</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Wins</p>
              <p className="text-lg font-semibold text-foreground">{wins}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t bg-transparent p-4">
          <Button type="button" variant="outline" className="w-full">
            View Profile
          </Button>
        </CardFooter>
      </Card>
    </article>
  );
}
