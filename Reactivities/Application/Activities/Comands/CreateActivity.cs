using Application.Dtos;
using Application.Results;
using Application.Validators;
using Domain;
using FluentValidation;
using Mapster;
using MediatR;
using Persistence;
using System;


namespace Application.Activities.Comands
{
    public record CreateActivityCommand(Activity Activity): IRequest<Results<ActivityDto>>;

    public class CreateActivityCommandValidator: BaseFluentValidator<CreateActivityCommand, Activity>
    {
        public CreateActivityCommandValidator(): base(x => x.Activity)
        {
            RuleFor(x => x.Activity.City).NotEmpty().WithMessage("Activity.City Required");
        }
    }

    public class CreateActivity(AppDbContext appDbContext, IUserInfo userInfo) : IRequestHandler<CreateActivityCommand, Results<ActivityDto>>
    {
        public async Task<Results<ActivityDto>> Handle(CreateActivityCommand request, CancellationToken cancellationToken)
        {
            appDbContext.Activities.Add(request.Activity);

            request.Activity.Attendees.Add(
                new ActivityAttendee
                {
                    ActivityId = request.Activity.Id,
                    UserId = userInfo.GetUserId(),
                    IsHost = true,
                });

            await appDbContext.SaveChangesAsync();

            return Results<ActivityDto>.Success(request.Activity.Adapt<ActivityDto>());
        }
    }
}
