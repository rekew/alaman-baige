using Backend.Core;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class RefreshTokenRepository : IRefreshTokenRepository
{
    private readonly ApplicationDbContext _dbContext;

    public RefreshTokenRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<RefreshToken?> GetByToken(string token)
    {
        return await _dbContext.RefreshTokens
            .FirstOrDefaultAsync(x => x.Token == token);
    }

    public async Task Add(RefreshToken token)
    {
        await _dbContext.RefreshTokens.AddAsync(token);
        await _dbContext.SaveChangesAsync();
    }

    public async Task Update(RefreshToken token)
    {
        _dbContext.RefreshTokens.Update(token);
        await _dbContext.SaveChangesAsync();
    }
}