using Application.Dtos;
using Application.Results;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries
{
    public record GetActivityQuery(string id) : IRequest<Results<ActivityDto>>;

    public class GetActivity(AppDbContext appDbContext) : IRequestHandler<GetActivityQuery, Results<ActivityDto>>
    {
        public async Task<Results<ActivityDto>> Handle(GetActivityQuery request, CancellationToken cancellationToken)
        {
            var activity = await appDbContext.Activities.Include(x => x.Attendees)
                .ThenInclude(x => x.User).ProjectToType<ActivityDto>().FirstAsync(x => x.Id ==request.id);

            if (activity == null) return Results<ActivityDto>.Failure("Activity not found",404);

            return Results<ActivityDto>.Success(activity);
        }
    }
}
