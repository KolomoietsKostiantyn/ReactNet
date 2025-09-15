using Application;
using Application.Dtos;
using Domain;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class FolowController(AppDbContext appDbContext, IUserInfo  userInfo): BaseApiController
    {
        [HttpPut("{id}/subscribe")]
        public async Task<IActionResult> Subscribe(string id)
        {
            var userId = userInfo.GetUserId();

            var subscriteTo = await appDbContext.Users.FindAsync(id);

            var user = await appDbContext.Users.FindAsync(userId);

            var action = new UserFolowing
            {
                ObserventId = userId,
                TargetId = id,
            };

            subscriteTo.MyFolowers.Add(action);

            user.IFolowing.Add(action);

            await appDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}/UnsubSubscribe")]
        public async Task<IActionResult> UnsubSubscribe(string id)
        {
            var userId = userInfo.GetUserId();

            var link = await appDbContext.UserFolowings
                .Where(x => x.TargetId == id && x.ObserventId == userId).FirstOrDefaultAsync();

            appDbContext.UserFolowings.Remove(link);

            await appDbContext.SaveChangesAsync();
            
            return NoContent();
        }

        [HttpGet("GetFolowers")]
        public async Task<IActionResult> GetFolowers(string id)
        {
             var res = await appDbContext.UserFolowings
                .ProjectToType<UserFolowingDto>().Where(x => x.TargetId == id).ToListAsync();

            return Ok(res);
        }

        [HttpGet("GetFollowing")]
        public async Task<IActionResult> GetFollowing(string id)
        {
            var res = await appDbContext.UserFolowings
                .ProjectToType<UserFolowingDto>().Where(x => x.ObserventId == id).ToListAsync();

            return Ok(res);
        }

        [HttpGet("UserInfo")]
        public async Task<IActionResult> GetUserInfo(string id)
        {
            var userId = userInfo.GetUserId();
            var res = await appDbContext.UserFolowings.Where(x => x.TargetId == id)
               .ProjectToType<UserFolowingDto>().ToListAsync();

            var resFolowings = await appDbContext.UserFolowings.Where(x => x.ObserventId == id)
             .ProjectToType<UserFolowingDto>().CountAsync();

            var isSubscribed = res.Any(x => x.ObserventId == userId);

            return Ok(new { folowers = res.Count, isSubscribed ,following = resFolowings });

        }
    }
}
