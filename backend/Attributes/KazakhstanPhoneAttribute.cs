using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Backend.Attributes;

public class KazakhstanPhoneAttribute : ValidationAttribute
{
    private static readonly Regex PhoneRegex = new(@"^\+7\d{10}$");

    protected override ValidationResult? IsValid(
        object? value,
        ValidationContext validationContext)
    {
        if (value is null)
        {
            return ValidationResult.Success;
        }

        if (value is not string phone)
        {
            return new ValidationResult("Invalid phone number.");
        }

        return PhoneRegex.IsMatch(phone)
            ? ValidationResult.Success
            : new ValidationResult(
                "Phone number must be in Kazakhstan format: +7XXXXXXXXXX.");
    }
}