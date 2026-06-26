using Backend.Interfaces;
using Backend.DTOs;
using Backend.Core;
using Backend.Models;
using Microsoft.AspNetCore.Http;

namespace Backend.Services.Tables;

public class HorseService
{
    private readonly IHorseRepository _horseRepository;
    private readonly IUserRepository _userRepository;
    private readonly AmazonS3 _amazonS3;

    public HorseService(
        IHorseRepository horseRepository,
        IUserRepository userRepository,
        AmazonS3 amazonS3
    )
    {
        _horseRepository = horseRepository;
        _userRepository = userRepository;
        _amazonS3 = amazonS3;
    }

    public async Task<List<HorseResponseDto>> GetTable()
    {
        var horses = await _horseRepository.GetTable();
        return horses.Select(ToResponseDto).ToList();
    }

    public async Task<bool> AddHorse(CreateHorseDto horseDto)
    {
        var user = await _userRepository.GetByIdAsync(horseDto.UserId);
        if (user is null)
        {
            return false;
        }

        var horse = new Horse
        {
            Name = horseDto.Name,
            Breed = horseDto.Breed,
            Gender = horseDto.Gender,
            Date = horseDto.Date,
            UserId = horseDto.UserId
        };

        horse.ImageFileName = await UploadHorseImageAsync(horseDto.Image);

        await _horseRepository.AddHorse(horse);
        return true;
    }

    public async Task<bool> UpdateHorse(int id, UpdateHorseDto horseDto)
    {
        var existingHorse = await _horseRepository.GetById(id);
        if (existingHorse is null)
        {
            return false;
        }

        var user = await _userRepository.GetByIdAsync(horseDto.UserId);
        if (user is null)
        {
            return false;
        }

        existingHorse.Name = horseDto.Name;
        existingHorse.Breed = horseDto.Breed;
        existingHorse.Gender = horseDto.Gender;
        existingHorse.Date = horseDto.Date;
        existingHorse.UserId = horseDto.UserId;

        if (horseDto.Image is not null)
        {
            existingHorse.ImageFileName = await UploadHorseImageAsync(horseDto.Image);
        }

        await _horseRepository.UpdateHorse(existingHorse);
        return true;
    }

    public async Task<bool> DeleteHorse(int id)
    {
        var horse = await _horseRepository.GetById(id);
        if (horse is null)
        {
            return false;
        }

        await _horseRepository.DeleteHorse(horse);
        return true;
    }

    private async Task<string?> UploadHorseImageAsync(IFormFile? file)
    {
        if (file is null || file.Length == 0)
        {
            return null;
        }

        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";

        await _amazonS3.UploadFileAsync(file.OpenReadStream(), fileName);

        return fileName;
    }

    private HorseResponseDto ToResponseDto(Horse horse)
    {
        return new HorseResponseDto
        {
            Id = horse.Id,
            Name = horse.Name,
            Breed = horse.Breed,
            Gender = horse.Gender,
            Date = horse.Date,
            UserId = horse.UserId,
            ImageUrl = string.IsNullOrWhiteSpace(horse.ImageFileName)
                ? null
                : _amazonS3.GetPublicUrl(horse.ImageFileName)
        };
    }
}