using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Backend.Services;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        var AuthResponseDto = await _authService.Register(dto);

        if (AuthResponseDto is null)
        {
            return Conflict("User already exists");
        }

        return Ok(AuthResponseDto);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var AuthResponseDto = await _authService.Login(dto);

        if (AuthResponseDto is null)
        {
            return Unauthorized("Invalid credentials");
        }

        return Ok(AuthResponseDto);
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] RefreshRequestDto dto)
    {
        var AuthResponseDto = await _authService.Refresh(dto.RefreshToken);

        if (AuthResponseDto is null)
        {
            return Unauthorized("Invalid refresh token");
        }

        return Ok(AuthResponseDto);
    }

    [HttpPost("revoke")]
    public async Task<IActionResult> Revoke([FromBody] RefreshRequestDto dto)
    {
        await _authService.Revoke(dto.RefreshToken);

        return NoContent();
    }
}