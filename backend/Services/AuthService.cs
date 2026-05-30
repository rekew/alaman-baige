using Backend.DTOs;
using Backend.Models;
using Backend.Interfaces;
using Backend.Core;

namespace Backend.Services;

public class AuthService
{
    private readonly IUserRepository _userRepository;
    private readonly Jwt _jwt;

    public AuthService(IUserRepository userRepository, Jwt jwt)
    {
        _userRepository = userRepository;
        _jwt = jwt;
    }

    public async Task<string?> Register(RegisterDto dto)
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

        return _jwt.GenerateToken(user);
    }
}