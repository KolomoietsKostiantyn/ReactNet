using Application.Dtos;
using Application.Results;
using Domain;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.Activities.Comands
{
    public record UpdateActivityCommand(Activity Activity) : IRequest<Results<ActivityDto>>;


    public class UpdateActivity(AppDbContext appDbContext, IUserInfo userInfo) : IRequestHandler<UpdateActivityCommand, Results<ActivityDto>>
    {
        public async Task<Results<ActivityDto>> Handle(UpdateActivityCommand request, CancellationToken cancellationToken)
        {

            var activity1 = await appDbContext.Activities
                .Include(x => x.Attendees)
                .Where(x => x.Id == request.Activity.Id).FirstOrDefaultAsync();

            var owner =  activity1.Attendees.Where(x => x.IsHost).First();

            if (owner.UserId != userInfo.GetUserId())
            { 
                return Results<ActivityDto>.Failure("not owner", 403);
            }

            if (activity1 != null)
            {
                return Results<ActivityDto>.Failure("no item", 404);
            }
            appDbContext.Entry(activity1).CurrentValues.SetValues(request.Activity);

            await appDbContext.SaveChangesAsync();

            return Results<ActivityDto>.Success(request.Activity.Adapt<ActivityDto>());
        }
    }
}
