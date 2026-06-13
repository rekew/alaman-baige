namespace Backend.Models;

public abstract class BaseEntity
{
    public DateTime InsertedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}