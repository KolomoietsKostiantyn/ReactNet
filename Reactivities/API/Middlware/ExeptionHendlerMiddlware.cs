
using FluentValidation;

namespace API.Middlware
{
    public class ExeptionHendlerMiddlware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);

            }
            catch (ValidationException ex)
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                context.Response.ContentType = "application/json";
                var payload = new
                {
                    title = "validation fail",
                    stausCode = 400,
                    exeptions =  ex.Errors.Select(x => x.ErrorMessage)
                };
                 await context.Response.WriteAsJsonAsync(payload);
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                context.Response.ContentType = "application/json";
                var payload = new
                {
                    title = "fail",
                    stausCode = 400,
                    error = ex.ToString()
                };

                await context.Response.WriteAsJsonAsync(payload);
                
            }
        }
    }
}
