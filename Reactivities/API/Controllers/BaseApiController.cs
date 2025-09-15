using Application.Results;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        protected ISender sender => HttpContext.RequestServices.GetService<ISender>();

        protected IActionResult HandleResult<T>(Results<T> results)
        { 
            if (results.IsSuccess) return Ok(results.Value);
            if(!results.IsSuccess && results.Code ==404) return NotFound(results.Exeption); 

            return BadRequest(results.Exeption);
        }

    }
}
