using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Backend.DTOs;
using Backend.Exceptions.UserRepositoryExceptions;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }

    [Authorize(Roles = "admin,user")]
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

        try
        {
            await _userService.UpdateUserAsync(userId, dto);
            return NoContent();
        }
        catch (UserNotFoundException)
        {
            return NotFound();
        }
        catch (PhoneAlreadyExistsException)
        {
            return Conflict("Phone number already used.");
        }
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

        try
        {
            await _userService.PatchUserAsync(userId, dto);
            return NoContent();
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (UserNotFoundException)
        {
            return NotFound();
        }
        catch (PhoneAlreadyExistsException)
        {
            return Conflict("Phone number already used.");
        }
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

        try
        {
            await _userService.DeleteUserAsync(userId);
            return NoContent();
        }
        catch (UserNotFoundException)
        {
            return NotFound();
        }
    }
}
