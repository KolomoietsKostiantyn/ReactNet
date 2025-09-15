using API.DTOs;
using Application.Activities.Comands;
using Application.Activities.Queries;
using Domain;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivitiesController(): BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetActivities([FromQuery] ActivityCursor? activityCursor,
            [FromQuery] int? pageSize, [FromQuery] string? filter, [FromQuery] DateTime startDate )
        {
            var query = new GetActivitiesQuery { Cursor = activityCursor };
            if (pageSize.HasValue)
                query.PageSize = pageSize.Value;
            query.DateTime = startDate;
            query.Filter = filter;

            return HandleResult(await sender.Send(query));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivityDetail(string id)
        {
            return HandleResult(await sender.Send(new GetActivityQuery(id)));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(string id)
        {
            return HandleResult(await sender.Send(new DeleteActivityCommand(id)));
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(ActivityDTO activity)
        {
            return HandleResult(await sender.Send(new CreateActivityCommand(activity.Adapt<Activity>())));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateActivity(ActivityDTO activity)
        {
            return HandleResult(await sender.Send(new UpdateActivityCommand(activity.Adapt<Activity>())));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpPost("{id}/swith")]
        public async Task<IActionResult> SwithActivity(string id)
        {            
            return HandleResult(await sender.Send(new SwithActivity(id)));
        }

        [HttpPost("{id}/subscribe")]
        public async Task<IActionResult> SubscribeActivity(string id)
        {
            return HandleResult(await sender.Send(new SubscribeActivity(id)));
        }

    }
}
