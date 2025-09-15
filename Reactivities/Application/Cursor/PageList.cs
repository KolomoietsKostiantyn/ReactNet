using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Cursor
{
    public class PageList<T, TCursor>
    {
        public List<T> Items { get; set; } = new();
        public TCursor? NextCursors { get; set; }
    }
}
