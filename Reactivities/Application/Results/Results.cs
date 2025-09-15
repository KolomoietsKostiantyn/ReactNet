using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Results
{
    public class Results<T>
    {
        public bool IsSuccess { get; set; }
        public T Value { get; set; }
        public string Exeption { get; set; }
        public int Code { get; set; }

        public static Results<T> Success(T value) => new() { IsSuccess = true, Value = value };
        public static Results<T> Failure(string exeption, int code) => new() { Exeption = exeption, Code = code };
    }
}
