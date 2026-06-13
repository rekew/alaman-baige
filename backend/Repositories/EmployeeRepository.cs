using Backend.Models;
using Backend.Core;
using Backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class EmployeeRepository : IEmployeeRepository
{
    private readonly ApplicationDbContext _dbContext;

    public EmployeeRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Employee?> GetByUserIdAsync(int userId)
    {
        return await _dbContext.Employees
            .FirstOrDefaultAsync(employee => employee.UserId == userId);
    }
}
