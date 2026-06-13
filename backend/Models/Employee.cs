namespace Backend.Models;

public class Employee : BaseEntity
{
    public int Id { get; set; }
    public required int UserId { get; set; }
    public User User { get; set; } = null!;
}