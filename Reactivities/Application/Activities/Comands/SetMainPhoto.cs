using Application.Interfaces;
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
    public record SetMainPhoto(string id) : IRequest<Results<Unit>>;

    public class SetMainPhotoHandler(IFileServise fileServise, IUserInfo userInfo, AppDbContext appDbContext) :
        IRequestHandler<SetMainPhoto, Results<Unit>>
    {
        public async Task<Results<Unit>> Handle(SetMainPhoto request, CancellationToken cancellationToken)
        {
            var userId = userInfo.GetUserId();
            var user = await userInfo.GetUser();
            var photo = await appDbContext.Photos.FirstOrDefaultAsync(x => x.Id == request.id);
            if (photo == null) return Results<Unit>.Failure("not found", 404);
            if (user.ImageUrl == photo.URL) return Results<Unit>.Failure("already set", 409);
            user.ImageUrl = photo.URL;
            if (!photo.IsMain)
            {
                photo.IsMain = true;
                var oldMain = await appDbContext.Photos.FirstOrDefaultAsync(x => x.UserId == userId & x.IsMain == true);
                oldMain.IsMain = false;
            }
            await appDbContext.SaveChangesAsync();

            return Results<Unit>.Success(Unit.Value);
        }
    }

}
