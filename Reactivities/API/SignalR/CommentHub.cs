using Application.Activities.Comands;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace API.SignalR
{
    public class CommentHub(ISender sender): Hub
    {
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var activityId = httpContext.Request.Query["id1"];           

            await Groups.AddToGroupAsync(Context.ConnectionId, activityId);

            var connents = await sender.Send(new GetComments(activityId));

            await Clients.Caller.SendAsync("LoadComments", connents.Value);
        }

        public async Task SendComment(Comment comment)
        {
            await sender.Send(new AddComment(comment));

            await Clients.Group(comment.ActivityId).SendAsync("NewComment", comment);
        
        }
    }
}
