using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Backend.Services.Tables;

namespace Backend.Controllers.Tables;

[ApiController]
[Route("api/admin/tables/[controller]")]
[Authorize(Policy = "AdminOnly")]
public class HorseController : ControllerBase
{
    private readonly HorseService _horseService;

    public HorseController(HorseService horseService)
    {
        _horseService = horseService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Horse>>> GetTable()
    {
        var horses = await _horseService.GetTable();

        if (horses.Count == 0)
        {
            return NoContent();
        }

        return Ok(horses);
    }

    [HttpPost]
    public async Task<ActionResult> AddHorse(Horse horse)
    {

        var res = await _horseService.AddHorse(horse);

        if (res)
        {
            return Ok();
        }

        return BadRequest("Owner doesn't exist");
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateHorse(
        int id,
        [FromBody] Horse horse
    )
    {
        var result = await _horseService.UpdateHorse(id, horse);

        if (!result)
        {
            return BadRequest("Horse or owner does not exist.");
        }

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteHorse(int id)
    {
        var result = await _horseService.DeleteHorse(id);

        if (!result)
        {
            return NotFound("Horse not found.");
        }

        return NoContent();
    }
}