using System.ComponentModel.DataAnnotations;
using Backend.Attributes;

namespace Backend.DTOs;
public class UpdateUserDto
{
    [Required]
    [StringLength(50, MinimumLength = 2)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [StringLength(50, MinimumLength = 2)]
    public string Surname { get; set; } = string.Empty;

    [Required]
    [KazakhstanPhone]
    [StringLength(20, MinimumLength = 10)]
    public string PhoneNumber { get; set; } = string.Empty;


}
