using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using bai3.Data;
using bai3.Model;

namespace bai3.ApiControllers
{
    [Route("api/sales")]
    [ApiController]
    public class ApiSalesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ApiSalesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("leads")]
        public async Task<ActionResult<IEnumerable<Lead>>> GetLeads()
        {
            return await _context.Leads.ToListAsync();
        }

        // CÁI NÀY QUAN TRỌNG: Phải có tham số kiểu Lead thì Swagger mới hiện Schema Lead
        [HttpPost("leads")]
        public async Task<ActionResult<Lead>> CreateLead(Lead lead)
        {
            _context.Leads.Add(lead);
            await _context.SaveChangesAsync();
            return Ok(lead);
        }
    }
}