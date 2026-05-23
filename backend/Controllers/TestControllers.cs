using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("/")]
public class TestController : ControllerBase
{
    [HttpGet]
    public string Get()
    {
        return "Hello World!";
    }
}