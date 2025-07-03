using Microsoft.AspNetCore.Mvc;
using CleanArchitecture.Application.DTOs.Player;
using CleanArchitecture.Application.Interfaces;
using System.Threading.Tasks;


namespace CleanArchitecture.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerService _playerService;

        public PlayerController(IPlayerService playerService)
        {
            _playerService = playerService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var players = await _playerService.GetAllAsync();
            return Ok(players);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var player = await _playerService.GetByIdAsync(id);
            if (player == null)
                return NotFound();

            return Ok(player);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePlayerDto dto)
        {
            var created = await _playerService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdatePlayerDto dto)
        {
            var updated = await _playerService.UpdateAsync(dto);
            return updated ? NoContent() : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _playerService.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }
    }
}
