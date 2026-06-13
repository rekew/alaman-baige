using Backend.Models;

namespace Backend.Interfaces;

public interface IHorseRepository
{
    Task<List<Horse>> GetTable();

    Task<Horse?> GetById(int id);

    Task AddHorse(Horse horse);

    Task UpdateHorse(Horse horse);

    Task DeleteHorse(Horse horse);
}