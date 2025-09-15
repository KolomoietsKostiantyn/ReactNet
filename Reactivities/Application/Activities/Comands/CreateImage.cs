using Application.Dtos;
using Application.Interfaces;
using Application.Results;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Comands
{
    public record CreateImage(IFormFile File): IRequest<Results<PhotoUploadResult>>;

    public class CreateImageHandler(IFileServise fileServise, IUserInfo userInfo, AppDbContext appDbContext) : IRequestHandler<CreateImage, Results<PhotoUploadResult>>
    {
        public async Task<Results<PhotoUploadResult>> Handle(CreateImage request, CancellationToken cancellationToken)
        {
            var userId = userInfo.GetUserId();
            var resultUpload =  await fileServise.CreateImage(request.File);
            var user = await appDbContext.Users.FirstOrDefaultAsync(x => x.Id == userId);
            var photo = new Photo
            {
                PublicId = resultUpload.PublicId,
                URL = resultUpload.URL,
                UserId = userId,
            };
            user.Photos.Add(photo);

            if (string.IsNullOrEmpty(user.ImageUrl))
            {
                user.ImageUrl = resultUpload.URL;
                photo.IsMain = true;
            }

            await appDbContext.SaveChangesAsync();
            resultUpload.Id = photo.Id;
            return Results<PhotoUploadResult>.Success(resultUpload);
        }
    }
}
