namespace Backend.DTOs;

public class GetUserDto
{
    public required int Id { get; set; }
    public required string FirstName { get; set; }
    public required string Surname { get; set; }
    public required string PhoneNumber {get; set;}
}