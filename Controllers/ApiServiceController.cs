using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using bai3.Data;
using bai3.Model;

namespace bai3.ApiControllers
{
    [Route("api/services")]
    [ApiController]
    public class ApiServiceController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ApiServiceController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("appointments")]
        public async Task<ActionResult<IEnumerable<ServiceAppointment>>> GetAppointments()
        {
            return await _context.ServiceAppointments.ToListAsync();
        }

        // CÁI NÀY CŨNG VẬY: Phải có ServiceAppointment ở đây Swagger mới hiện bảng
        [HttpPost("appointments")]
        public async Task<ActionResult<ServiceAppointment>> BookService(ServiceAppointment appointment)
        {
            _context.ServiceAppointments.Add(appointment);
            await _context.SaveChangesAsync();
            return Ok(appointment);
        }
    }
}