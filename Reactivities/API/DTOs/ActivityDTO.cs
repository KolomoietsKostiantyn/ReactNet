using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class ActivityDTO
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        [Required]
        public  string Title { get; set; }
        public DateTime? Date { get; set; }
        public  string Description { get; set; }
        public  string Category { get; set; }
        public bool IsCancelled { get; set; }
        // location props
        public  string City { get; set; }
        public  string Venue { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
