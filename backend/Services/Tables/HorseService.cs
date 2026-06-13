using Backend.Interfaces;
using Backend.Models;

namespace Backend.Services.Tables;

public class HorseService
{
    private readonly IHorseRepository _horseRepository;
    private readonly IUserRepository _userRepository;

    public HorseService(IHorseRepository horseRepository, IUserRepository userRepository)
    {
        _horseRepository = horseRepository;
        _userRepository = userRepository;
    }

    public async Task<List<Horse>> GetTable()
    {
        return await _horseRepository.GetTable();
    }

    public async Task<bool> AddHorse(Horse horse)
    {

        var user = await _userRepository.GetByIdAsync(horse.UserId);

        if (user is not null)
        {
            await _horseRepository.AddHorse(horse);

            return true;
        }

        return false;
    }

    public async Task<bool> UpdateHorse(int id, Horse horse)
    {
        var existingHorse = await _horseRepository.GetById(id);

        if (existingHorse is null)
        {
            return false;
        }

        var user = await _userRepository.GetByIdAsync(horse.UserId);

        if (user is null)
        {
            return false;
        }

        existingHorse.Name = horse.Name;
        existingHorse.Breed = horse.Breed;
        existingHorse.Gender = horse.Gender;
        existingHorse.Date = horse.Date;
        existingHorse.UserId = horse.UserId;

        await _horseRepository.UpdateHorse(existingHorse);

        return true;
    }

    public async Task<bool> DeleteHorse(int id)
    {
        var horse = await _horseRepository.GetById(id);

        if (horse is null)
        {
            return false;
        }

        await _horseRepository.DeleteHorse(horse);

        return true;
    }
}