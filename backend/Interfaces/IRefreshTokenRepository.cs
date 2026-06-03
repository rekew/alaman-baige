using Backend.Models;

namespace Backend.Interfaces;

public interface IRefreshTokenRepository
{
    Task<RefreshToken?> GetByToken(string token);
    Task Add(RefreshToken token);
    Task Update(RefreshToken token);
}