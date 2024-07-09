using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShippingSystem.DTOs.Representatives;
using ShippingSystem.Models;
using System.Collections.Generic;
using System.Data.Common;
using System.Threading.Tasks;

namespace ShippingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShippingTypeController : ControllerBase
    {
        private readonly ShippingContext _context;

        public ShippingTypeController(ShippingContext context)
        {
            _context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ShippingType>>> GetShippingTypes()
        {
            var types = await _context.ShippingTypes.ToListAsync();
            return Ok(types);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<ShippingType>> GetShippingType(int id)
        {
            var type = await _context.ShippingTypes.FindAsync(id);

            if (type == null)
            {
                return NotFound();
            }
            return type;
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<ShippingType>> PostShippingType(ShippingType typeDto)
        {
            var type = new ShippingType
            {
                Name = typeDto.Name,
                Status = typeDto.Status,
                AdditionalShippingValue = typeDto.AdditionalShippingValue,
                
            };
            _context.ShippingTypes.Add(type);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetShippingType", new { id = type.Id }, type);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> PutShippingType(int id, ShippingType typeDto)
        {
            if (id != typeDto.Id)
            {
                return BadRequest();
            }
            var type = await _context.ShippingTypes.FirstOrDefaultAsync(r => r.Id == id);
            if (type == null)
            {
                return NotFound();
            }
            type.Status = typeDto.Status;
            type.Name = typeDto.Name;
            type.AdditionalShippingValue = typeDto.AdditionalShippingValue;

            _context.ShippingTypes.Update(type);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShippingTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteShippingType(int id)
        {
            var type = await _context.ShippingTypes.FindAsync(id);
            if (type == null)
            {
                return NotFound();
            }
            _context.ShippingTypes.Remove(type);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool ShippingTypeExists(int id)
        {
            return _context.ShippingTypes.Any(e => e.Id == id);
        }

    }
}
