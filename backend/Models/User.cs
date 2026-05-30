namespace Backend.Models;

public class User
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string Surname { get; set; }
    public required string Email { get; set; }
    public required string PhoneNumber {get; set;}
}