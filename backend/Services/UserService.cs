using Backend.DTOs;
using Backend.Models;
using Backend.Interfaces;
using Backend.Core;
using Backend.Exceptions.UserRepositoryExceptions;

namespace Backend.Services;

public class UserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<GetUserDto?> GetUserAsync(int userId)
    {
        if (userId <= 0)
        {
            return null;
        }

        var user = await _userRepository.GetByIdAsync(userId);

        if (user is null)
        {
            return null;
        }

        return new GetUserDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            Surname = user.Surname,
            PhoneNumber = user.PhoneNumber,
            Role = user.Role
        };
    }

    public async Task UpdateUserAsync(int userId, UpdateUserDto dto)
    {
        var user = await _userRepository.GetByIdAsync(userId);

        if (user is null)
        {
            throw new UserNotFoundException();
        }

        user.FirstName = dto.FirstName;
        user.Surname = dto.Surname;
        user.PhoneNumber = dto.PhoneNumber;

        await _userRepository.UpdateAsync(user);
    }

    public async Task PatchUserAsync(int userId, PatchUserDto dto)
    {
        if (dto.FirstName is null && dto.Surname is null && dto.PhoneNumber is null)
        {
            throw new ArgumentException("At least one field must be provided.", nameof(dto));
        }

        var user = await _userRepository.GetByIdAsync(userId);

        if (user is null)
        {
            throw new UserNotFoundException();
        }

        if (dto.PhoneNumber is not null)
        {
            user.PhoneNumber = dto.PhoneNumber;
        }

        if (dto.FirstName is not null)
        {
            user.FirstName = dto.FirstName;
        }

        if (dto.Surname is not null)
        {
            user.Surname = dto.Surname;
        }

        await _userRepository.UpdateAsync(user);
    }

    public async Task DeleteUserAsync(int userId)
    {
        var deleted = await _userRepository.RemoveByIdAsync(userId);

        if (!deleted)
        {
            throw new UserNotFoundException();
        }
    }
}
