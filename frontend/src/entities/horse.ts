export interface IHorse{
    id: number,
    name: string,
    breed: string,
    gender: string,
    date: Date,
    userId: number,
    imageUrl?: string | null
}