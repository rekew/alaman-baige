namespace Backend.Models;

public class Employee
{
    public int Id { get; set; }
    public required int UserId { get; set; }
    public User User { get; set; } = null!;
}