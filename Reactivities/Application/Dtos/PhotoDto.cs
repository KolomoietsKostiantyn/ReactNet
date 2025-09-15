using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos
{
    public class PhotoDto
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string URL { get; set; }

        public string UserId { get; set; }
        public bool IsMain { get; set; }
    }
}
