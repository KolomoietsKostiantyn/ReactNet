using Application.Results;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Comands
{
    public record SubscribeActivity(string id) : IRequest<Results<Unit>>;

    public class SubscribeActivityHandler(AppDbContext appDbContext, IUserInfo userInfo) : IRequestHandler<SubscribeActivity, Results<Unit>>
    {
        public async Task<Results<Unit>> Handle(SubscribeActivity request, CancellationToken cancellationToken)
        {
            var activity = await appDbContext.Activities.Include(x => x.Attendees)
                .FirstOrDefaultAsync(x => x.Id == request.id);

            if (activity == null) return Results<Unit>.Failure("No activity", 404);

            var currentUserId = userInfo.GetUserId();
            var userRel =  activity.Attendees.FirstOrDefault(x => x.UserId == currentUserId);

            if (userRel != null && userRel.IsHost) return Results<Unit>.Failure("Host cannot unsubscribe", 403);
            if (userRel == null)
            {
                activity.Attendees.Add(new() {  ActivityId = activity.Id, UserId = currentUserId });
            }
            else
            {
                activity.Attendees.Remove(userRel);
            }
   
            await appDbContext.SaveChangesAsync();

            return Results<Unit>.Success(Unit.Value);
        }
    }
}
