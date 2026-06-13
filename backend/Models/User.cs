namespace Backend.Models;

public class User : BaseEntity
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string Surname { get; set; }
    public required string PhoneNumber { get; set; }
    public required string Password { get; set; }
    public string Role { get; set; } = "User"; 
}