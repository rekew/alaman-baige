import { useState } from "react";
import { Trophy } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddHorseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddHorseModal({ open, onOpenChange }: AddHorseModalProps) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = async () => {

    const horse = {
      name,
      breed,
      gender,
      date,
      userId: Number(userId),
    };

    console.log(horse);

    setName("");
    setBreed("");
    setGender("");
    setDate("");
    setUserId("");

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-137.5">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Add Horse
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>

            <Input
              id="name"
              placeholder="Tulpar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="breed">Breed</Label>

            <Input
              id="breed"
              placeholder="Akhal-Teke"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>

            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>

                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Birth Date</Label>

            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="userId">Owner ID</Label>

            <Input
              id="userId"
              type="number"
              placeholder="1"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit">Create Horse</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
