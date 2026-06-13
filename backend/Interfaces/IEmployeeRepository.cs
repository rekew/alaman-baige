using Backend.Models;

namespace Backend.Interfaces;
public interface IEmployeeRepository
{
    Task<Employee?> GetByUserIdAsync(int userId);
}
