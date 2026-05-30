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
        var token = await _authService.Register(dto);

        if(token is null)
        {
            return Conflict("User already exists");
        }

        return Ok(new
        {
            Token = token
        });

    }
}