using Backend.Models;
using Backend.Core;
using Backend.Interfaces;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace Backend.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _dbContext;

    public UserRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<UserRepositoryResult> AddAsync(User user)
    {
        await _dbContext.Users.AddAsync(user);

        try
        {
            await _dbContext.SaveChangesAsync();
            return UserRepositoryResult.Success;
        }
        catch (DbUpdateException ex) when (IsPhoneNumberUniqueViolation(ex))
        {
            return UserRepositoryResult.PhoneNumberAlreadyUsed;
        }
    }

    public async Task<User?> GetByPhoneNumberAsync(string phoneNumber)
    {
        return await _dbContext.Users
            .FirstOrDefaultAsync(user => user.PhoneNumber == phoneNumber);
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        return await _dbContext.Users
            .FirstOrDefaultAsync(user => user.Id == id);
    }

    public async Task<UserRepositoryResult> UpdateAsync(User user)
    {
        if (user is null)
        {
            throw new ArgumentNullException(nameof(user));
        }

        var existingUser = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Id == user.Id);

        if (existingUser is null)
        {
            return UserRepositoryResult.NotFound;
        }

        _dbContext.Entry(existingUser).CurrentValues.SetValues(user);

        try
        {
            await _dbContext.SaveChangesAsync();
            return UserRepositoryResult.Success;
        }
        catch (DbUpdateException ex) when (IsPhoneNumberUniqueViolation(ex))
        {
            return UserRepositoryResult.PhoneNumberAlreadyUsed;
        }
    }

    public async Task RemoveAsync(User user)
    {
        if (user is null)
        {
            throw new ArgumentNullException(nameof(user));
        }

        _dbContext.Users.Remove(user);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<bool> RemoveByIdAsync(int id)
    {
        var affectedRows = await _dbContext.Users
            .Where(u => u.Id == id)
            .ExecuteDeleteAsync();

        return affectedRows > 0;
    }

    private static bool IsPhoneNumberUniqueViolation(DbUpdateException exception)
    {
        return exception.InnerException is PostgresException
        {
            SqlState: PostgresErrorCodes.UniqueViolation,
            ConstraintName: "ix_users_phone_number_unique"
        };
    }
}
