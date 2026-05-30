using Backend.Models;

namespace Backend.Interfaces;

public interface IUserRepository
{
    Task Add(User user);

    Task <User?> GetByPhoneNumber(string phoneNumber);
}