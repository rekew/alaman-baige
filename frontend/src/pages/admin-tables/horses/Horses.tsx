import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { getTable } from "./api";
import { type IHorse } from "@/entities/horse";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { AddHorseModal } from "./AddHorseModal";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

export function Horses() {
  const [horses, setHorses] = useState<IHorse[]>([]);
  const [addHorseModalOpen, setAddHorseModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchHorses = async () => {
      const data = await getTable();
      setHorses(data);
    };

    fetchHorses();
  }, []);

  return (
    <>
      <div className="p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Horses</CardTitle>

            <Button
              className="gap-2"
              onClick={() => setAddHorseModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Horse
            </Button>
          </CardHeader>

          <CardContent>
            {horses.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No horses found
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Breed</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Birth Date</TableHead>
                    <TableHead>Owner ID</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {horses.map((horse) => (
                    <TableRow key={horse.id}>
                      <TableCell>{horse.id}</TableCell>

                      <TableCell>
                        {horse.imageUrl ? (
                          <img
                            src={horse.imageUrl}
                            alt={horse.name}
                            onClick={() => setSelectedImage(horse.imageUrl ?? null)}
                            className="h-24 w-24 cursor-pointer rounded-md object-cover transition-opacity hover:opacity-80"
                          />
                        ) : (
                          <div className="flex h-24 w-24 items-center justify-center rounded-md border border-dashed text-xs text-muted-foreground">
                            No image
                          </div>
                        )}
                      </TableCell>

                      <TableCell className="font-medium">
                        {horse.name}
                      </TableCell>

                      <TableCell>{horse.breed}</TableCell>

                      <TableCell>{horse.gender}</TableCell>

                      <TableCell>
                        {new Date(horse.date).toLocaleDateString()}
                      </TableCell>

                      <TableCell>{horse.userId}</TableCell>

                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button size="icon" variant="outline">
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <Button size="icon" variant="destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <AddHorseModal
        open={addHorseModalOpen}
        onOpenChange={setAddHorseModalOpen}
      />

      <Dialog
        open={selectedImage !== null}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-6xl p-2">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Horse"
              className="max-h-[90vh] w-full rounded-md object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}