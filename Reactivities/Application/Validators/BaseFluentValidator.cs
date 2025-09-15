using Application.Dtos;
using Domain;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Validators
{
    public  class BaseFluentValidator<T, TDto>: AbstractValidator<T> where TDto : Activity
    {
        public BaseFluentValidator(Func<T, TDto> func)
        {
            RuleFor(x => func(x).Title).MinimumLength(3).WithMessage("MinimumLength 3");
        }
    }
}
