// Program.cs (����������� ������ ��� health-check)
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// liveness
app.MapGet("/healthz", () => Results.Ok("OK"));
// (�����������) readiness
app.MapGet("/ready", () => Results.Ok("READY"));

app.Run();
