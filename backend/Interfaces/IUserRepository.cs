using Backend.Models;

namespace Backend.Interfaces;
public interface IUserRepository
{
    Task AddAsync(User user);
    Task<User?> GetByPhoneNumberAsync(string phoneNumber);
    Task<User?> GetByIdAsync(int id);
    Task UpdateAsync(User user);
    Task RemoveAsync(User user);
    Task<bool> RemoveByIdAsync(int id);
}
