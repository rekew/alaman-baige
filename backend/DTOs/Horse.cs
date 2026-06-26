namespace Backend.DTOs;

public class CreateHorseDto
{
    public required string Name { get; set; }
    public required string Breed { get; set; }
    public required HorseGender Gender { get; set; }
    public required IFormFile Image { get; set; }
    public required DateOnly Date { get; set; }
    public required int UserId { get; set; }
}

public class UpdateHorseDto
{
    public required string Name { get; set; }
    public required string Breed { get; set; }
    public required HorseGender Gender { get; set; }
    public IFormFile? Image { get; set; }
    public required DateOnly Date { get; set; }
    public required int UserId { get; set; }
}

public class HorseResponseDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Breed { get; set; }
    public required HorseGender Gender { get; set; }
    public required DateOnly Date { get; set; }
    public required int UserId { get; set; }
    public string? ImageUrl { get; set; }
}