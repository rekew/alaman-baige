using Backend.DTOs;
using Backend.Models;
using Backend.Interfaces;
using Backend.Core;

namespace Backend.Services;

public class AuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly Jwt _jwt;

    public AuthService(IUserRepository userRepository, IRefreshTokenRepository refreshTokenRepository, Jwt jwt)
    {
        _userRepository = userRepository;
        _refreshTokenRepository = refreshTokenRepository;
        _jwt = jwt;
    }

    public async Task<AuthResponseDto?> Register(RegisterDto dto)
    {
        var existingUser = await _userRepository.GetByPhoneNumber(dto.PhoneNumber);
        if (existingUser is not null) return null;

        var user = new User
        {
            FirstName = dto.FirstName,
            Surname = dto.Surname,
            PhoneNumber = dto.PhoneNumber,
            Password = dto.Password
        };

        await _userRepository.Add(user);

        return await GenerateAuthResponse(user);
    }

    public async Task<AuthResponseDto?> Login(LoginDto dto)
    {
        var user = await _userRepository.GetByPhoneNumber(dto.PhoneNumber);
        if (user is null || user.Password != dto.Password) return null;

        return await GenerateAuthResponse(user);
    }

    public async Task<AuthResponseDto?> Refresh(string refreshToken)
    {
        var stored = await _refreshTokenRepository.GetByToken(refreshToken);
        if (
            stored is null ||
            stored.IsRevoked ||
            stored.ExpiresAt <= DateTime.UtcNow
        ) return null;

        stored.IsRevoked = true;
        await _refreshTokenRepository.Update(stored);

        var user = await _userRepository.GetById(stored.UserId);

        if (user is null)
            return null;

        return await GenerateAuthResponse(user);
    }

    public async Task Revoke(string refreshToken)
    {
        var stored = await _refreshTokenRepository.GetByToken(refreshToken);
        if (stored is null) return;

        stored.IsRevoked = true;
        await _refreshTokenRepository.Update(stored);
    }

    private async Task<AuthResponseDto> GenerateAuthResponse(User user)
    {
        var accessToken = _jwt.GenerateToken(user);
        var refreshToken = _jwt.GenerateRefreshToken(user.Id);

        await _refreshTokenRepository.Add(refreshToken);

        return new AuthResponseDto
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken.Token
        };
    }
}