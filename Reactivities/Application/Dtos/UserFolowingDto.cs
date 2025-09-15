using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos
{
    public  class UserFolowingDto
    {
        public string ObserventId { get; set; }

        public string TargetId { get; set; }

        public DateTime DateTime { get; set; } = DateTime.Now;
    }
}
