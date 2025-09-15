using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [AllowAnonymous]
    public class AccountController(UserManager<User> userManager, SignInManager<User> signInManager) : BaseApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult> Register(UserDto user)
        {
            var usercreate = new User {
                UserName = user.Username,
                Email = user.Email
            };
            await userManager.CreateAsync(usercreate, user.Password);

            return NoContent();
        }

        [AllowAnonymous]
        [HttpGet("user-info")]
        public async Task<ActionResult> GerUserInfo()
        {
            if (User?.Identity?.IsAuthenticated == false) return NoContent();

            var user = await userManager.GetUserAsync(User);

            if(user == null) return NoContent();

            return Ok(new {user.DisplayName, user.UserName, user.Email, user.Id});
        }

        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return NoContent();
        }

    }
}
