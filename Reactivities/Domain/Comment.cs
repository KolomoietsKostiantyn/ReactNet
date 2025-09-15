using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Comment
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Body { get; set; }
        public DateTime DateTime { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }

        public Activity Activity { get; set; }

        public string ActivityId { get; set; }
    }
}
