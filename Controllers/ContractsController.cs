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
    public class ContractsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContractsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Contracts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contract>>> GetContracts()
        {
            return await _context.Contracts.ToListAsync();
        }

        // GET: api/Contracts/5
        // SỬA: Đổi int id thành string id
        [HttpGet("{id}")]
        public async Task<ActionResult<Contract>> GetContract(string id)
        {
            var contract = await _context.Contracts.FindAsync(id);

            if (contract == null) return NotFound();

            return contract;
        }

        // PUT: api/Contracts/5
        // SỬA: Đổi int id thành string id, Id thành ContractId
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContract(string id, Contract contract)
        {
            if (id != contract.ContractId) return BadRequest();

            _context.Entry(contract).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContractExists(id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        // POST: api/Contracts
        [HttpPost]
        public async Task<ActionResult<Contract>> PostContract(Contract contract)
        {
            _context.Contracts.Add(contract);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ContractExists(contract.ContractId)) return Conflict();
                else throw;
            }

            // SỬA: Id thành ContractId
            return CreatedAtAction("GetContract", new { id = contract.ContractId }, contract);
        }

        // DELETE: api/Contracts/5
        // SỬA: Đổi int id thành string id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContract(string id)
        {
            var contract = await _context.Contracts.FindAsync(id);
            if (contract == null) return NotFound();

            _context.Contracts.Remove(contract);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // SỬA: Đổi int id thành string id, Id thành ContractId
        private bool ContractExists(string id)
        {
            return _context.Contracts.Any(e => e.ContractId == id);
        }
    }
}