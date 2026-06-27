using Backend.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]s")]
public class StatisticController : ControllerBase
{

    private readonly StatisticService _statisticService;

    public StatisticController(StatisticService statisticService)
    {
        _statisticService = statisticService;
    }

    public async Task<ActionResult<StatisticDto>> GetStatistics()
    {

        StatisticDto dto = await _statisticService.GetStatistics();

        return Ok(dto);
    }
}