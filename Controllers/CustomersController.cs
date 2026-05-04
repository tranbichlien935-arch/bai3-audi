using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using bai3.Data;
using bai3.Model;

namespace bai3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CustomersController(AppDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // 1. GET: Lấy danh sách tất cả khách VIP
        // ==========================================
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            return await _context.Customers.ToListAsync();
        }

        // ==========================================
        // 2. GET: Tìm 1 khách theo ID
        // ==========================================
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound(new { message = "Không tìm thấy khách hàng này!" });
            }

            return customer;
        }

        // ==========================================
        // 3. PUT: Cập nhật thông tin khách
        // ==========================================
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            // SỬA LỖI 1: Thay CarId thành CustomerId
            if (id != customer.CustomerId)
            {
                return BadRequest(new { message = "ID trên URL và ID trong thân dữ liệu không khớp!" });
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound(new { message = "Không tìm thấy khách hàng để cập nhật!" });
                }
                else
                {
                    throw;
                }
            }

            return NoContent(); // Thành công nhưng không cần trả về Data
        }

        // ==========================================
        // 4. POST: Thêm khách VIP mới vô hệ thống
        // ==========================================
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            // SỬA LỖI 2: Thay CarId thành CustomerId
            return CreatedAtAction("GetCustomer", new { id = customer.CustomerId }, customer);
        }

        // ==========================================
        // 5. DELETE: Xóa khách hàng
        // ==========================================
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound(new { message = "Không tìm thấy khách hàng để xóa!" });
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Đã xóa khách hàng thành công!" });
        }

        // Hàm hỗ trợ kiểm tra khách có tồn tại không
        private bool CustomerExists(int id)
        {
            // SỬA LỖI 3: Thay CarId thành CustomerId
            return _context.Customers.Any(e => e.CustomerId == id);
        }
    }
}