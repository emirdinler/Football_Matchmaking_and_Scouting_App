using Microsoft.AspNetCore.Identity;
using System;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace CleanArchitecture.Infrastructure.Models
{
    public class ApplicationUser : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }

    // Eğer bunları birleştirip kullanıyorsan:

public string Name
{
    get => $"{FirstName} {LastName}";
    set
    {
        if (!string.IsNullOrWhiteSpace(value))
        {
            var parts = value.Split(' ', 2);
            FirstName = parts[0];
            LastName = parts.Length > 1 ? parts[1] : "";
        }
    }
}
}
}
