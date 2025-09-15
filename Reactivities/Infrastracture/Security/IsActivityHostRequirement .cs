using Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastracture.Security
{
    public class IsActivityHostRequirement:IAuthorizationRequirement
    {
    }

    public class IsActivityHostRequirementHendler(
        AppDbContext appDbContext, 
        IUserInfo userInfo, 
        IHttpContextAccessor httpContextAccessor) :
        AuthorizationHandler<IsActivityHostRequirement>
    {
        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsActivityHostRequirement requirement)
        {
            var userid = userInfo.GetUserId();
            var httpContext = httpContextAccessor.HttpContext;
            var activityId = httpContext.GetRouteValue("id").ToString();
            if (string.IsNullOrEmpty(activityId)) return;

            var activity = await appDbContext.Activities.Include(x => x.Attendees)
                .FirstOrDefaultAsync(x => x.Id == activityId);

            if (!activity.Attendees.Any(x => x.UserId == userid && x.IsHost)) return;

            context.Succeed(requirement);

        }
    }
}
