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
    public  record SwithActivity(string id): IRequest<Results<Unit>>;

    public class SwithActivityHendler(AppDbContext appDbContext, IUserInfo userInfo) : IRequestHandler<SwithActivity, Results<Unit>>
    {
        public async Task<Results<Unit>> Handle(SwithActivity request, CancellationToken cancellationToken)
        {
            var activity = await appDbContext.Activities.Include(x => x.Attendees)
                .FirstOrDefaultAsync(x => x.Id == request.id) ;

            if (activity == null) return Results<Unit>.Failure("No activity", 404);
            var currentUserId = userInfo.GetUserId();
            if (!activity.Attendees.Any(x => x.UserId == currentUserId && x.IsHost)) 
                return Results<Unit>.Failure("No access", 403);

            activity.IsCancelled = !activity.IsCancelled;

            await appDbContext.SaveChangesAsync();

            return Results<Unit>.Success(Unit.Value);
        }
    }
}
