using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class UserFolowing
    {
        public string ObserventId { get; set; }
        public User Observent { get; set; }

        public string TargetId { get; set; }
        public User Target { get; set; }

        public DateTime DateTime { get; set; } = DateTime.Now;
    }
}
