using Backend.Models;
using Backend.Enums;

namespace Backend.Interfaces;
public interface IUserRepository
{
    Task<UserRepositoryResult> AddAsync(User user);
    Task<User?> GetByPhoneNumberAsync(string phoneNumber);
    Task<User?> GetByIdAsync(int id);
    Task<UserRepositoryResult> UpdateAsync(User user);
    Task RemoveAsync(User user);
    Task<bool> RemoveByIdAsync(int id);
}
