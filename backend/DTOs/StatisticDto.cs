namespace Backend.DTOs;

public class StatisticDto
{
    public int TotalHorses { get; set; }
    public int ActiveCompetitions { get; set; } = 0;
    public int TotalOwners { get; set; }
    public int TotalRaces { get; set; } = 0;
}