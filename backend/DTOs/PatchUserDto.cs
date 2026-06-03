using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

public class PatchUserDto
{
    [StringLength(50, MinimumLength = 2)]
    public string? FirstName { get; set; }

    [StringLength(50, MinimumLength = 2)]
    public string? Surname { get; set; }

    [Phone]
    [RegularExpression(@"^\+7\d{10}$", ErrorMessage = "Phone number must be in Kazakhstan format: +7XXXXXXXXXX.")]
    [StringLength(20, MinimumLength = 10)]
    public string? PhoneNumber { get; set; }
}
