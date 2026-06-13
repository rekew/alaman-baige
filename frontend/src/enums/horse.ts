export const HorseGender = {
    Male: "Male",
    Female: "Female",
} as const;

export type HorseGender =
    (typeof HorseGender)[keyof typeof HorseGender];