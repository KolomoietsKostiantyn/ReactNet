using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Photo
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string PublicId { get; set; }
        public string URL { get; set; }

        public User User { get; set; }

        public string UserId { get; set; }
        public bool IsMain { get; set; }
    }
}
