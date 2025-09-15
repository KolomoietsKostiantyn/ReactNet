using Application.Results;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Comands
{
    public record DeleteActivityCommand(string id):IRequest<Results<Unit>>;

    public class DeleteActivity(AppDbContext appDbContext) : IRequestHandler<DeleteActivityCommand, Results<Unit>>
    {
        public async Task<Results<Unit>> Handle(DeleteActivityCommand request, CancellationToken cancellationToken)
        {
            var activity = await appDbContext.Activities.FindAsync(request.id);

            if (activity != null)
            {
                return  Results<Unit>.Failure("no item", 404);
            }
            appDbContext.Activities.Remove(activity);
            await appDbContext.SaveChangesAsync();

            return Results<Unit>.Success(Unit.Value);
        }
    }
}
