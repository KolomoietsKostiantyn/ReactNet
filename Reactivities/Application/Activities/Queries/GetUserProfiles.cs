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
    public record GetUserProfiles(string id): IRequest<Results<UserDto>>;

    public class GetUserProfilesHandler(AppDbContext appDbContext, IUserInfo userInfo) : IRequestHandler<GetUserProfiles, Results<UserDto>>
    {
        public async Task<Results<UserDto>> Handle(GetUserProfiles request, CancellationToken cancellationToken)
        {
            var user = await appDbContext.Users
                .Select(x=> new UserDto
                {
                    Id= x.Id,
                    Bio = x.Bio,
                    ImageUrl = x.ImageUrl,
                    DisplayName = x.DisplayName,                
                })
                .FirstOrDefaultAsync(x => x.Id == request.id);

            if (user == null) Results<UserDto>.Failure("No user", 404);

            return Results<UserDto>.Success(user);
        }
    }
}
