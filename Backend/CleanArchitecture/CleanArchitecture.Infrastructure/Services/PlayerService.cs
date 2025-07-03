using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using CleanArchitecture.Application.DTOs.Player;
using CleanArchitecture.Application.Interfaces;
using CleanArchitecture.Core.Entities;
using CleanArchitecture.Infrastructure.Contexts;

namespace CleanArchitecture.Infrastructure.Services
{
    public class PlayerService : IPlayerService
    {
        private readonly ApplicationDbContext _context;

        public PlayerService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<PlayerDto>> GetAllAsync()
        {
            return await _context.Players
                .Select(p => new PlayerDto
                {
                    Id = p.Id,
                    UserId = p.UserId,
                    Position = p.Position,
                    Foot = p.Foot,
                    Rating = p.Rating,
                    Bio = p.Bio,
                    PreferredPlayStyle = p.PreferredPlayStyle
                })
                .ToListAsync();
        }

        public async Task<PlayerDto> GetByIdAsync(int id)
        {
            var p = await _context.Players.FindAsync(id);
            if (p == null) return null;

            return new PlayerDto
            {
                Id = p.Id,
                UserId = p.UserId,
                Position = p.Position,
                Foot = p.Foot,
                Rating = p.Rating,
                Bio = p.Bio,
                PreferredPlayStyle = p.PreferredPlayStyle
            };
        }

        public async Task<PlayerDto> CreateAsync(CreatePlayerDto dto)
        {
            var player = new Player
            {
                UserId = dto.UserId,
                Position = dto.Position,
                Foot = dto.Foot,
                Bio = dto.Bio,
                PreferredPlayStyle = dto.PreferredPlayStyle,
                Rating = 0
            };

            _context.Players.Add(player);
            await _context.SaveChangesAsync();

            return new PlayerDto
            {
                Id = player.Id,
                UserId = player.UserId,
                Position = player.Position,
                Foot = player.Foot,
                Rating = player.Rating,
                Bio = player.Bio,
                PreferredPlayStyle = player.PreferredPlayStyle
            };
        }

        public async Task<bool> UpdateAsync(UpdatePlayerDto dto)
        {
            var player = await _context.Players.FindAsync(dto.Id);
            if (player == null) return false;

            player.Position = dto.Position;
            player.Foot = dto.Foot;
            player.Bio = dto.Bio;
            player.PreferredPlayStyle = dto.PreferredPlayStyle;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var player = await _context.Players.FindAsync(id);
            if (player == null) return false;

            _context.Players.Remove(player);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
