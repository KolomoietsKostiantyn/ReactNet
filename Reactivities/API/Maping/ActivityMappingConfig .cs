using Application.Dtos;
using Domain;
using Mapster;

namespace API.Maping
{
    public sealed class ActivityMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            // ActivityAttendee -> UserDto
            config.NewConfig<ActivityAttendee, UserDto>()
                  .Map(dest => dest.Id, src => src.UserId)
                  .Map(dest => dest.DisplayName, src => src.User!.DisplayName)
                  .Map(dest => dest.Bio, src => src.User!.Bio)
                  .Map(dest => dest.ImageUrl, src => src.User!.ImageUrl)
                  .Map(dest => dest.Ishost, src=> src.IsHost);

            // Activity -> ActivityDto
            config.NewConfig<Activity, ActivityDto>()
                  .Map(dest => dest.Attendees, src => src.Attendees)
                  .Map(x=> x.HostId, src => (src.Attendees.Where(x=> x.IsHost).Select(x=>x.UserId).FirstOrDefault()))
                  .Map(d => d.HostDisplayName, s => s.Attendees.Where(a => a.IsHost)
               .Select(a => a.User != null ? a.User.DisplayName : null)
               .FirstOrDefault());

            config.NewConfig<UserFolowing, UserFolowingDto>()
                .Map(dest => dest.ObserventId, src => src.ObserventId)
                .Map(dest => dest.TargetId, src => src.TargetId)
                .Map(dest => dest.DateTime, src => src.DateTime);
                
                
                }
    }
}
