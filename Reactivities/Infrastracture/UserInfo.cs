using Application;
using Domain;
using Microsoft.AspNetCore.Http;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastracture
{
    public class UserInfo(IHttpContextAccessor httpContext, AppDbContext appDbContext) : IUserInfo
    {
        public async Task<User> GetUser()
        {
            return await appDbContext.Users.FindAsync(GetUserId());
        }

        public string GetUserId()
        {
           return httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
        }
    }
}
