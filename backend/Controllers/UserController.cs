using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Backend.DTOs;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetMe()
    {
        var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdValue, out var userId))
        {
            return Unauthorized();
        }

        var user = await _userService.GetUserAsync(userId);

        if (user is null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    [Authorize]
    [HttpPut("me")]
    public async Task<IActionResult> UpdateMe(UpdateUserDto dto)
    {
        var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdValue, out var userId))
        {
            return Unauthorized();
        }

        var result = await _userService.UpdateUserAsync(userId, dto);

        return result switch
        {
            UpdateUserResult.Success => NoContent(),
            UpdateUserResult.NotFound => NotFound(),
            UpdateUserResult.PhoneNumberAlreadyUsed => Conflict("Phone number already used."),
            _ => StatusCode(StatusCodes.Status500InternalServerError)
        };
    }

    [Authorize]
    [HttpPatch("me")]
    public async Task<IActionResult> PatchMe(PatchUserDto dto)
    {
        var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdValue, out var userId))
        {
            return Unauthorized();
        }

        var result = await _userService.PatchUserAsync(userId, dto);

        return result switch
        {
            PatchUserResult.Success => NoContent(),
            PatchUserResult.NotFound => NotFound(),
            PatchUserResult.NoFieldsToUpdate => BadRequest("At least one field must be provided."),
            PatchUserResult.PhoneNumberAlreadyUsed => Conflict("Phone number already used."),
            _ => StatusCode(StatusCodes.Status500InternalServerError)
        };
    }

    [Authorize]
    [HttpDelete("me")]
    public async Task<IActionResult> DeleteMe()
    {
        var userIdValue = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(userIdValue, out var userId))
        {
            return Unauthorized();
        }

        var result = await _userService.DeleteUserAsync(userId);

        return result switch
        {
            DeleteUserResult.Success => NoContent(),
            DeleteUserResult.NotFound => NotFound(),
            _ => StatusCode(StatusCodes.Status500InternalServerError)
        };
    }
}
