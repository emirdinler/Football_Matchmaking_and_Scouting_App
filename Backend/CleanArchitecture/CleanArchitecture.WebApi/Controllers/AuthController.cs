using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using CleanArchitecture.Infrastructure.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using CleanArchitecture.Application.DTOs.Register;
using System;
using CleanArchitecture.Application.Settings;
using Microsoft.Extensions.Options;
using System.Linq;



namespace CleanArchitecture.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IConfiguration _config;
    private readonly JWTSettings _jwtSettings;

    public AuthController(UserManager<ApplicationUser> userManager,
                          SignInManager<ApplicationUser> signInManager,
                          IOptions<JWTSettings> jwtSettings)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtSettings = jwtSettings.Value;
    }

    [HttpPost("register")]
public async Task<IActionResult> Register(RegisterDto dto)
{
    if (dto.Password != dto.ConfirmPassword)
        return BadRequest(new { message = "Şifreler uyuşmuyor." });

    var user = new ApplicationUser
    {
        UserName = dto.Email,
        Email = dto.Email,
        Name = dto.Name
    };

    var result = await _userManager.CreateAsync(user, dto.Password);

    if (!result.Succeeded)
    {
        var errorMessages = result.Errors.Select(e => e.Description);
        return BadRequest(new { message = string.Join(" | ", errorMessages) });
    }

    return Ok(new { message = "Kayıt başarılı." });
}



   [HttpPost("login")]
public async Task<IActionResult> Login([FromBody] LoginDto dto)
{
    try
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user == null)
            return Unauthorized(new { message = "Kullanıcı bulunamadı." });

        var result = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, false);
        if (!result.Succeeded)
            return Unauthorized(new { message = "Şifre hatalı." });

        // 🎯 TOKEN ÜRETİMİ
        var authClaims = new[]
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));

        var token = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            expires: DateTime.Now.AddMinutes(_jwtSettings.DurationInMinutes),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );

        return Ok(new
        {
            token = new JwtSecurityTokenHandler().WriteToken(token),
            expiration = token.ValidTo
        });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new
        {
            message = ex.Message,
            stack = ex.StackTrace
        });
    }
}
}
