using Application.Dtos;
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
    public record GetUserPhotos(string id): IRequest<Results<List<PhotoDto>>>;

    public class GetUserPhotosHandler(AppDbContext appDbContext) : IRequestHandler<GetUserPhotos, Results<List<PhotoDto>>>
    {
        public async Task<Results<List<PhotoDto>>> Handle(GetUserPhotos request, CancellationToken cancellationToken)
        {
            var res = await  appDbContext.Photos
                .Where(x => x.UserId == request.id)
                .Select(x => new PhotoDto 
                { 
                    Id = x.Id,
                    URL = x.URL,
                    UserId = x.UserId,
                    IsMain = x.IsMain})
                .ToListAsync();
            return Results<List<PhotoDto>>.Success(res);
        }
    }
}
