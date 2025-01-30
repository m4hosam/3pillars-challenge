using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;


public interface IAuthService
{
    Task<string> LoginAsync(LoginDTO loginDto);
    Task<bool> RegisterAsync(RegisterDTO registerDto);
}

public class AuthService : IAuthService
{
    private readonly AddressBookContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(AddressBookContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<string> LoginAsync(LoginDTO loginDto)
    {
        var admin = await _context.AdminUsers.FirstOrDefaultAsync(u => u.Email == loginDto.Email);
        if (admin == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, admin.Password))
        {
            throw new UnauthorizedAccessException("Invalid email or password");
        }

        return GenerateJwtToken(admin);
    }

    public async Task<bool> RegisterAsync(RegisterDTO registerDto)
    {
        if (await _context.AdminUsers.AnyAsync(u => u.Email == registerDto.Email))
        {
            throw new InvalidOperationException("Email already exists");
        }

        var admin = new AdminUser
        {
            Username = registerDto.Username,
            Email = registerDto.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password)
        };

        _context.AdminUsers.Add(admin);
        await _context.SaveChangesAsync();
        return true;
    }

    private string GenerateJwtToken(AdminUser admin)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings").Get<JwtSettings>();
        var key = Encoding.ASCII.GetBytes(jwtSettings.Secret);

        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, admin.Id.ToString()),
                new Claim(ClaimTypes.Email, admin.Email),
            }),
            Expires = DateTime.UtcNow.AddMinutes(jwtSettings.ExpirationInMinutes),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Issuer = jwtSettings.Issuer,
            Audience = jwtSettings.Audience
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}