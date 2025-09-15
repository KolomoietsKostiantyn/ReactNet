using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Validators
{
    public class ValidationBehavior<TRequst, TResponse> :
        IPipelineBehavior<TRequst, TResponse> where TRequst : notnull
    {
        private readonly IEnumerable<IValidator<TRequst>> _validators;

        public ValidationBehavior(IEnumerable<IValidator<TRequst>> validators) => _validators = validators;

        public async Task<TResponse> Handle(TRequst request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            if (_validators.Any())
            {
                var res = await Task.WhenAll(_validators.Select(x => x.ValidateAsync(request, cancellationToken)));

                var resErrors = res.SelectMany(x => x.Errors).ToList();
             
                if (resErrors.Any())
                {
                    throw new ValidationException(resErrors);
                }

            }

            return await next();
        }
    }
}
