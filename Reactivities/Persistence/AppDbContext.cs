using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace Persistence
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<Comment> Comments { get; set; } 

        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }

        public DbSet<UserFolowing> UserFolowings { get; set; }
        

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ActivityAttendee>().HasKey(x=> new {x.UserId, x.ActivityId });

            builder.Entity<Activity>()
                .HasIndex(x => new { x.Date, x.Id });


            builder.Entity<ActivityAttendee>()
                .HasOne(x => x.Activity)
                .WithMany(x => x.Attendees)
                .HasForeignKey(x => x.ActivityId);

            builder.Entity<ActivityAttendee>()
                .HasOne(x => x.User)
                .WithMany(x => x.Attendees)
                .HasForeignKey(x => x.UserId);

            builder.Entity<Photo>()
                .HasOne(x => x.User)
                .WithMany(x => x.Photos).
                HasForeignKey(x => x.UserId);

            builder.Entity<Comment>().Property(x => x.DateTime)
                .HasConversion(
                    x => x.ToUniversalTime(),
                    x => DateTime.SpecifyKind(x, DateTimeKind.Utc)
                );

            builder.Entity<UserFolowing>().HasKey(x=>  new {x.ObserventId, x.TargetId});

            builder.Entity<UserFolowing>()
                .HasOne(x => x.Observent)
                .WithMany(x => x.IFolowing)
                .HasForeignKey(x => x.ObserventId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<UserFolowing>()
                .HasOne(x => x.Target)
                .WithMany(x => x.MyFolowers)
                .HasForeignKey(x => x.TargetId)
                .OnDelete(DeleteBehavior.NoAction);

            base.OnModelCreating(builder);
        }
    }
}
