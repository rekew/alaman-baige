using Backend.DTOs;
using Backend.Models;
using Backend.Interfaces;
using Backend.Core;

namespace Backend.Services;

public enum UpdateUserResult
{
    Success,
    NotFound,
    PhoneNumberAlreadyUsed
}

public enum PatchUserResult
{
    Success,
    NotFound,
    NoFieldsToUpdate,
    PhoneNumberAlreadyUsed
}

public enum DeleteUserResult
{
    Success,
    NotFound
}

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
            PhoneNumber = user.PhoneNumber
        };
    }

    public async Task<UpdateUserResult> UpdateUserAsync(int userId, UpdateUserDto dto)
    {
        var user = await _userRepository.GetByIdAsync(userId);

        if (user is null)
        {
            return UpdateUserResult.NotFound;
        }

        user.FirstName = dto.FirstName;
        user.Surname = dto.Surname;
        user.PhoneNumber = dto.PhoneNumber;

        var result = await _userRepository.UpdateAsync(user);

        if (result == UserRepositoryResult.NotFound)
        {
            return UpdateUserResult.NotFound;
        }

        if (result == UserRepositoryResult.PhoneNumberAlreadyUsed)
        {
            return UpdateUserResult.PhoneNumberAlreadyUsed;
        }

        return UpdateUserResult.Success;
    }

    public async Task<PatchUserResult> PatchUserAsync(int userId, PatchUserDto dto)
    {
        if (dto.FirstName is null && dto.Surname is null && dto.PhoneNumber is null)
        {
            return PatchUserResult.NoFieldsToUpdate;
        }

        var user = await _userRepository.GetByIdAsync(userId);

        if (user is null)
        {
            return PatchUserResult.NotFound;
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

        var result = await _userRepository.UpdateAsync(user);

        if (result == UserRepositoryResult.NotFound)
        {
            return PatchUserResult.NotFound;
        }

        if (result == UserRepositoryResult.PhoneNumberAlreadyUsed)
        {
            return PatchUserResult.PhoneNumberAlreadyUsed;
        }

        return PatchUserResult.Success;
    }

    public async Task<DeleteUserResult> DeleteUserAsync(int userId)
    {
        var deleted = await _userRepository.RemoveByIdAsync(userId);

        return deleted
            ? DeleteUserResult.Success
            : DeleteUserResult.NotFound;
    }
}
