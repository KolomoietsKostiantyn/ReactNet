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
    public record DeletePhoto(string PublicId) : IRequest<Results<Unit>>;

    public class DeletePhotoHandler(IFileServise fileServise, IUserInfo userInfo, AppDbContext appDbContext) : IRequestHandler<DeletePhoto, Results<Unit>>
    {
        public async Task<Results<Unit>> Handle(DeletePhoto request, CancellationToken cancellationToken)
        {
            var userId =  userInfo.GetUserId();
            var user = await userInfo.GetUser();
            var photo = await appDbContext.Photos.FirstOrDefaultAsync(x => x.Id == request.PublicId);
            if (photo == null) return Results<Unit>.Failure("not found", 404);
            if (user.ImageUrl == photo.URL) user.ImageUrl = null;
            var res = await fileServise.DeletePhoto(request.PublicId);

            appDbContext.Remove(photo);
            await appDbContext.SaveChangesAsync();

            return Results<Unit>.Success(Unit.Value);
        }
    }

}
