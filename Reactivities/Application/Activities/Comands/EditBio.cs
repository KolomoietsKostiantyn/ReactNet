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
    public record EditBio(string bio): IRequest<Results<Unit>>;

    public class EditBioHandler(IUserInfo userInfo, AppDbContext appContext) : IRequestHandler<EditBio, Results<Unit>>
    {
        public async Task<Results<Unit>> Handle(EditBio request, CancellationToken cancellationToken)
        {
            var user = await appContext.Users.FirstOrDefaultAsync(x => x.Id == userInfo.GetUserId());
            user.Bio = request.bio;

            await appContext.SaveChangesAsync();

            return Results<Unit>.Success(Unit.Value);

        }
    }
}
