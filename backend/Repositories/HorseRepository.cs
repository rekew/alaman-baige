using Backend.Core;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class HorseRepository : IHorseRepository
{

    private readonly ApplicationDbContext _dbContext;

    public HorseRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Horse>> GetTable()
    {
        return await _dbContext.Horses.ToListAsync();
    }

    public async Task AddHorse(Horse horse)
    {
        _dbContext.Horses.Add(horse);

        await _dbContext.SaveChangesAsync();
    }

    public async Task<Horse?> GetById(int id)
    {
        return await _dbContext.Horses
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task UpdateHorse(Horse horse)
    {
        _dbContext.Horses.Update(horse);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteHorse(Horse horse)
    {
        _dbContext.Horses.Remove(horse);
        await _dbContext.SaveChangesAsync();
    }
}