using Application.Cursor;
using Application.Dtos;
using Application.Results;
using Domain;
using Mapster;
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
    public class ActivityCursor
    { 
        public DateTime? DateTime { get; set; }
        public string? Id{ get; set; }
    }

    public class GetActivitiesQuery : IRequest<Results<PageList<ActivityDto, ActivityCursor>>>
    {
        private static int MaxPageSize = 50;

        public ActivityCursor Cursor { get; set; }

        private int _pagesize = 3;

        public int PageSize { get => _pagesize; set { _pagesize = value < MaxPageSize ? value : MaxPageSize; } }

        public string? Filter { get; set; }
        public DateTime?  DateTime { get; set; }
    }


    public class GetActivities(AppDbContext appDbContext, IUserInfo userInfo) : IRequestHandler<GetActivitiesQuery, Results<PageList<ActivityDto, ActivityCursor>>>
    {
        public async Task<Results<PageList<ActivityDto, ActivityCursor>>> Handle(GetActivitiesQuery request, CancellationToken cancellationToken)
        {
            var query = appDbContext.Activities
                .OrderBy(x =>x.Date)
                .ThenBy(x=> x.Id)
                .AsQueryable(); 


            if (request.Cursor != null && request.Cursor.DateTime != null && request.Cursor.Id != null)
            {
                query = query.Where(x => x.Date >= request.Cursor.DateTime || 
                    (x.Date == request.Cursor.DateTime && x.Id == request.Cursor.Id ));
            }

            query = query.Take(request.PageSize + 1);

            if (!string.IsNullOrEmpty(request.Filter))
            {
                switch (request.Filter)
                {
                    case "going":
                        query = query.Where(x => x.Attendees.Any(c => c.UserId == userInfo.GetUserId()));
                        break;
                    case "hosting":
                        query = query.Where(x => x.Attendees.Any(c => c.UserId == userInfo.GetUserId() && c.IsHost));
                        break;
                    default:
                        break;
                }
            }

            if (request.DateTime.HasValue)
            {
                query = query.Where(x => x.Date >= request.DateTime.Value);
            }

            var asd =  query.ToQueryString();


            var res = await query.ProjectToType<ActivityDto>().AsNoTracking().ToListAsync(cancellationToken);

            ActivityCursor cursor = null;

            if ( res.Count == request.PageSize + 1)
            {
                cursor = new ActivityCursor 
                {
                    Id = res.Last().Id,
                    DateTime = res.Last().Date
                };
                res.Remove(res.Last());
            }

            return  Results<PageList<ActivityDto, ActivityCursor>>.Success(
                new PageList<ActivityDto, ActivityCursor> { Items = res, NextCursors = cursor });
        }
    }
}
