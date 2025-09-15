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

namespace Application.Activities.Comands
{
    public record AddComment(Comment comment) : IRequest<Results<Comment>>;

    public class AddCommentHandler(AppDbContext appDbContext, IUserInfo userInfo) : IRequestHandler<AddComment, Results<Comment>>
    {
        public async Task<Results<Comment>> Handle(AddComment request, CancellationToken cancellationToken)
        {
            var activity = await appDbContext.Activities.FirstOrDefaultAsync(x => x.Id == request.comment.ActivityId);

            if (activity == null) return Results<Comment>.Failure("No Activity", 404);
           
            activity.Comments.Add(request.comment);
            await appDbContext.SaveChangesAsync();

            request.comment.Activity = null;
            request.comment.User = null;

            return Results<Comment>.Success(request.comment);
        }
    }
}
