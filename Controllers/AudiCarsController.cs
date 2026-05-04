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
    public class AudiCarsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AudiCarsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AudiCar>>> GetAudiCars()
        {
            return await _context.AudiCars.ToListAsync();
        }

        // SỬA: int id -> string id
        [HttpGet("{id}")]
        public async Task<ActionResult<AudiCar>> GetAudiCar(string id)
        {
            var audiCar = await _context.AudiCars.FindAsync(id);

            if (audiCar == null) return NotFound();

            return audiCar;
        }

        // SỬA: int id -> string id, Id -> CarId
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAudiCar(string id, AudiCar audiCar)
        {
            if (id != audiCar.CarId) return BadRequest();

            _context.Entry(audiCar).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AudiCarExists(id)) return NotFound();
                else throw;
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<AudiCar>> PostAudiCar(AudiCar audiCar)
        {
            _context.AudiCars.Add(audiCar);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                // SỬA: Id -> CarId
                if (AudiCarExists(audiCar.CarId)) return Conflict();
                else throw;
            }

            // SỬA: Id -> CarId
            return CreatedAtAction("GetAudiCar", new { id = audiCar.CarId }, audiCar);
        }

        // SỬA: int id -> string id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAudiCar(string id)
        {
            var audiCar = await _context.AudiCars.FindAsync(id);
            if (audiCar == null) return NotFound();

            _context.AudiCars.Remove(audiCar);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // SỬA: int id -> string id, Id -> CarId
        private bool AudiCarExists(string id)
        {
            return _context.AudiCars.Any(e => e.CarId == id);
        }
    }
}