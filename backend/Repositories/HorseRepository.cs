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

    public async Task<(int, int)> GetCount()
    {
        var result = await _dbContext.Horses
            .GroupBy(_ => 1)
            .Select(g => new
            {
                HorseCount = g.Count(),
                OwnerCount = g.Select(h => h.UserId).Distinct().Count()
            })
            .SingleAsync();
        return (result.HorseCount, result.OwnerCount);
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