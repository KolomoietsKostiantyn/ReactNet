using Application.Activities.Comands;
using Application.Activities.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ProfilesController(ISender sender): BaseApiController
    {

        [HttpPost("add-photo")]
        public async Task<IActionResult> AddPhoto(IFormFile file)
        {
            return HandleResult(await sender.Send(new CreateImage(file)));
        }

        [HttpPut("edit-bio")]
        public async Task<IActionResult> EditBio([FromBody]string bio)
        {
            
            return HandleResult(await sender.Send(new EditBio(bio)));
        }

        //[Authorize(Policy = "IsActivityHost")]
        [HttpPost("{id}/delete-photo")]
        public async Task<IActionResult> DeletePhoto(string id)
        {
            return HandleResult(await sender.Send(new DeletePhoto(id)));
        }

       // [Authorize(Policy = "IsActivityHost")]
        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMain(string id)
        {
            return HandleResult(await sender.Send(new SetMainPhoto(id)));
        }


        [HttpGet]
        public async Task<IActionResult> GetUserProfiles(string id)
        {
            return HandleResult(await sender.Send(new GetUserProfiles(id)));
        }

        [HttpGet("{id}/photos")]
        public async Task<IActionResult> GetUserPhotos(string id)
        {
            return HandleResult(await sender.Send(new GetUserPhotos(id)));
        }



    }
}
