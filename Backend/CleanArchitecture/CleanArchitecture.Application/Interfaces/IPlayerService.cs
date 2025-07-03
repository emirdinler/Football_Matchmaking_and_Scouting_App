using System.Collections.Generic;
using System.Threading.Tasks;
using CleanArchitecture.Application.DTOs.Player;

namespace CleanArchitecture.Application.Interfaces
{
    public interface IPlayerService
    {
        Task<List<PlayerDto>> GetAllAsync();
        Task<PlayerDto> GetByIdAsync(int id);
        Task<PlayerDto> CreateAsync(CreatePlayerDto dto);
        Task<bool> UpdateAsync(UpdatePlayerDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
