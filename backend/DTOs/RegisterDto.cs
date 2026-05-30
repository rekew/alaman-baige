namespace Backend.DTOs;

public class RegisterDto
{
    public required string FirstName { get; set; }
    public required string Surname { get; set; }
    public required string PhoneNumber {get; set;}
    public required string Password {get; set;}
}