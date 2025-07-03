using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;
using System;


namespace CleanArchitecture.Infrastructure.Contexts
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../CleanArchitecture.WebApi"))
                .AddJsonFile("appsettings.json", optional: false)
                .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");

            Console.WriteLine($"[DEBUG] Bağlantı cümlesi: {connectionString}");

            var builder = new DbContextOptionsBuilder<ApplicationDbContext>();
            builder.UseNpgsql(connectionString);

            return new ApplicationDbContext(builder.Options);
        }
    }
}
