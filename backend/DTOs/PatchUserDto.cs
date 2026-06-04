using System.ComponentModel.DataAnnotations;
using Backend.Attributes;

namespace Backend.DTOs;

public class PatchUserDto
{
    [StringLength(50, MinimumLength = 2)]
    public string? FirstName { get; set; }

    [StringLength(50, MinimumLength = 2)]
    public string? Surname { get; set; }

    [Phone]
    [KazakhstanPhone]
    [StringLength(20, MinimumLength = 10)]
    public string? PhoneNumber { get; set; }
}
