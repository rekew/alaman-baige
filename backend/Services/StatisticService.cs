using Backend.DTOs;
using Backend.Interfaces;

namespace Backend.Services;

public class StatisticService
{

    private readonly IHorseRepository _horseRepository;

    public StatisticService(IHorseRepository horseRepository)
    {
        _horseRepository = horseRepository;
    }

    public async Task<StatisticDto> GetStatistics()
    {
        var horses = await _horseRepository.GetCount();

        return new StatisticDto
        {
            TotalHorses = horses.Item1,
            TotalOwners = horses.Item2
        };
    }
}