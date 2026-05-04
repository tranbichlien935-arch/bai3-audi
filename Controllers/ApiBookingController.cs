using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using bai3.Data;   // NHỚ CHECK LẠI CHỮ bai3 NHA MÁ
using bai3.Model;

namespace bai3.ApiControllers
{
    [Route("api/bookings")]
    [ApiController]
    public class ApiBookingController : ControllerBase
    {
        private readonly AppDbContext _context;

        // Tiêm Database vô đây nè
        public ApiBookingController(AppDbContext context)
        {
            _context = context;
        }

        // POST: Đặt lịch lái thử
        [HttpPost("test-drive")]
        public async Task<ActionResult<Booking>> BookTestDrive(Booking bookingRequest)
        {
            // Ép cứng loại lịch hẹn là "Lái thử"
            bookingRequest.BookingType = "Lái thử";
            bookingRequest.Status = "Chờ xác nhận";

            _context.Bookings.Add(bookingRequest);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Đăng ký lái thử thành công!", data = bookingRequest });
        }

        // GET: Lấy danh sách lịch hẹn
        [HttpGet("all-bookings")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetAllBookings()
        {
            var bookings = await _context.Bookings.ToListAsync();
            return Ok(new { success = true, total = bookings.Count, data = bookings });
        }
    }
}