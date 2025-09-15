using Microsoft.AspNetCore.Identity;


namespace Domain
{
    public class User: IdentityUser
    {
        public string? DisplayName { get; set; }
        public string? Bio { get; set; }
        public string? ImageUrl { get; set; }

        public List<ActivityAttendee> Attendees { get; set; } = new();

        public List<Photo> Photos { get; set; } = new();

        public List<UserFolowing> IFolowing { get; set; } = new();

        public List<UserFolowing> MyFolowers { get; set; } = new();
    }
}
