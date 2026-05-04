using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Thêm dòng này để xài ToListAsync
// using AudiShowroom.API.Data; // Thay bằng namespace chứa AppDbContext của mày
// using AudiShowroom.Models; // Thay bằng namespace chứa class Car của mày

[Route("api/[controller]")]
[ApiController]
public class AdminCarController : ControllerBase
{
    private readonly IWebHostEnvironment _env;
    // MỞ COMMENT CHỖ NÀY VÀ THAY AppDbContext BẰNG TÊN DB CỦA MÀY
    // private readonly AppDbContext _context; 

    public AdminCarController(IWebHostEnvironment env /*, AppDbContext context */)
    {
        _env = env;
        // _context = context;
    }

    // --- HÀM 1: LẤY DANH SÁCH XE (Hết lỗi load bảng) ---
    [HttpGet]
    public async Task<IActionResult> GetCars()
    {
        // var cars = await _context.Cars.ToListAsync();
        // return Ok(cars);
        return Ok(new List<object>()); // Tạm thời trả về list trống nếu chưa có DB
    }

    // --- HÀM 2: LƯU XE MỚI (FIX LỖI 405 NÈ MÁ) ---
    [HttpPost]
    public async Task<IActionResult> CreateCar([FromBody] CarItem car)
    {
        if (car == null) return BadRequest("Dữ liệu xe trống trơn hà!");

        // Logic lưu vào DB giống Laravel Store nè
        // _context.Cars.Add(car);
        // await _context.SaveChangesAsync();

        return Ok(car);
    }

    // --- HÀM 3: UPLOAD ẢNH (GIỮ NGUYÊN CỦA MÀY) ---
    [HttpPost("upload-image")]
    public async Task<IActionResult> UploadImage(IFormFile image)
    {
        if (image == null || image.Length == 0) return BadRequest("Không có ảnh má ơi!");

        var uploadsPath = Path.Combine(_env.ContentRootPath, "wwwroot", "products");
        if (!Directory.Exists(uploadsPath)) Directory.CreateDirectory(uploadsPath);

        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
        var filePath = Path.Combine(uploadsPath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await image.CopyToAsync(stream);
        }

        return Ok(new { url = $"/products/{fileName}" });
    }

    // --- HÀM 4: XÓA XE (Giống destroy bên Laravel) ---
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCar(int id)
    {
        // var car = await _context.Cars.FindAsync(id);
        // if (car == null) return NotFound();
        // _context.Cars.Remove(car);
        // await _context.SaveChangesAsync();
        return Ok();
    }
}