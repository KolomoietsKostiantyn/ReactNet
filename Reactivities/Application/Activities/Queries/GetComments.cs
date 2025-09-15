using Application.Results;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Queries
{
    public record GetComments(string activityId): IRequest<Results<List<Comment>>>;

    public class GetCommentsHandler(AppDbContext appDbContext, IUserInfo userInfo) : IRequestHandler<GetComments, Results<List<Comment>>>
    {
        public async Task<Results<List<Comment>>> Handle(GetComments request, CancellationToken cancellationToken)
        {
            var activity = await appDbContext.Activities.Include(x => x.Comments).FirstOrDefaultAsync(x=> x.Id == request.activityId);

            if (activity == null) return Results<List<Comment>>.Failure("No Activity", 404);
            var asd  = activity.Comments.Select(x => new Comment { 
                ActivityId = x.ActivityId ,
                 Body = x.Body,
                  DateTime = x.DateTime,
                   Id = x.Id, 
                    UserId = x.UserId,
            
            
            
            });
            return Results<List<Comment>>.Success(asd.ToList());
        }
    }
}
