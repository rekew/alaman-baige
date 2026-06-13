namespace Backend.Models;

public class Horse : BaseEntity
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Breed {get; set;}
    public required HorseGender Gender {get; set;}
    public required DateOnly Date {get; set;}
    public required int UserId {get; set;} 
}