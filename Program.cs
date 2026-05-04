using Microsoft.EntityFrameworkCore;
using bai3.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Cấu hình CORS - Cho phép Frontend React gọi API (Thêm theo ý mày nè)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// 2. Đăng ký SQL Server (Kết nối Database Somee)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 3. Kích hoạt CORS (Phải đặt TRƯỚC MapControllers)
app.UseCors("AllowAll");

// 4. Cấu hình Middleware (Ép Swagger hiện lên dù ở môi trường nào)
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseAuthorization(); // Thêm cái này cho chuẩn bài bản ASP.NET

app.MapControllers();
app.Run();