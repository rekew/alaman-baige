using Microsoft.AspNetCore.Mvc;

using Backend.DTOs;
using Backend.Services;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly CookieOptions _cookieOptions;

    public AuthController(AuthService authService, CookieOptions cookieOptions)
    {
        _authService = authService;
        _cookieOptions = cookieOptions;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        var result = await _authService.Register(dto);

        if (result is null)
        {
            return Conflict("User already exists");
        }

        return Created();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var response = await _authService.Login(dto);

        if (response is null)
        {
            return Unauthorized("Invalid credentials");
        }

        Response.Cookies.Append(
            "access_token",
            response.AccessToken,
            new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddMinutes(15)
            });

        Response.Cookies.Append(
            "refresh_token",
            response.RefreshToken,
            new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddDays(7)
            });

        return Ok();
    }

    [HttpPost("login/admin")]
    public async Task<IActionResult> LoginAdmin(LoginDto dto)
    {
        var response = await _authService.LoginAdmin(dto);

        if (response is null)
        {
            return Unauthorized("Invalid credentials");
        }

        var accessCookieOptions = new CookieOptions
        {
            HttpOnly = _cookieOptions.HttpOnly,
            Secure = _cookieOptions.Secure,
            SameSite = _cookieOptions.SameSite,
            Expires = DateTimeOffset.UtcNow.AddMinutes(15)
        };

        var refreshCookieOptions = new CookieOptions
        {
            HttpOnly = _cookieOptions.HttpOnly,
            Secure = _cookieOptions.Secure,
            SameSite = _cookieOptions.SameSite,
            Expires = DateTimeOffset.UtcNow.AddDays(7)
        };

        Response.Cookies.Append(
            "access_token",
            response.AccessToken,
            accessCookieOptions
        );

        Response.Cookies.Append(
            "refresh_token",
            response.RefreshToken,
            refreshCookieOptions
        );

        return Ok();
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
        var refreshToken = Request.Cookies["refresh_token"];

        if (string.IsNullOrEmpty(refreshToken))
        {
            return Unauthorized();
        }

        var response = await _authService.Refresh(refreshToken);

        if (response is null)
        {
            return Unauthorized();
        }

        Response.Cookies.Append(
            "access_token",
            response.AccessToken,
            new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddMinutes(15)
            }
        );

        Response.Cookies.Append(
            "refresh_token",
            response.RefreshToken,
            new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddDays(7)
            }
        );

        return Ok();
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        var refreshToken = Request.Cookies["refresh_token"];

        if (!string.IsNullOrEmpty(refreshToken))
        {
            await _authService.Revoke(refreshToken);
        }

        Response.Cookies.Delete("access_token");
        Response.Cookies.Delete("refresh_token");

        return NoContent();
    }
}
