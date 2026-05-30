using Backend.Models;
using Backend.Core;
using Backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _dbContext;

    public UserRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Add(User user)
    {
        await _dbContext.Users.AddAsync(user);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<User?> GetByPhoneNumber(string phoneNumber)
    {
        return await _dbContext.Users
            .FirstOrDefaultAsync(user => user.PhoneNumber == phoneNumber);
    }
}