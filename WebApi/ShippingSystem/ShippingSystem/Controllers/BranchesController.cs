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
    public class BranchesController : ControllerBase
    {
        private readonly ShippingContext _context;

        public BranchesController(ShippingContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Branch>>> GetBranches()
        {
            var branches = await _context.Branches
               .Select(g => new BranchesDTO
               {
                   Id = g.Id,
                   Name = g.Name,
                   Status = g.Status,
                   AddingDate = g.AddingDate
               })
               .ToListAsync();
            return Ok(branches);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Branch>> GetBranch(int id)
        {
            var branch = await _context.Branches.FindAsync(id);

            if (branch == null)
            {
                return NotFound();
            }
            return branch;
        }

        [HttpPost]
        public async Task<ActionResult<Branch>> PostBranch(BranchesDTO branchDto)
        {
            var branch = new Branch
            {
                Name = branchDto.Name,
                Status = branchDto.Status,
                AddingDate = branchDto.AddingDate,
                
            };
            _context.Branches.Add(branch);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetBranch", new { id = branch.Id }, branch);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBranch(int id, BranchesDTO branchDto)
        {
            if (id != branchDto.Id)
            {
                return BadRequest();
            }
            var branch = await _context.Branches.FirstOrDefaultAsync(r => r.Id == id);
            if (branch == null)
            {
                return NotFound();
            }
            branch.Status = branchDto.Status;
            branch.Name = branchDto.Name;
            branch.AddingDate = branchDto.AddingDate;

            _context.Branches.Update(branch);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BranchExists(id))
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
        public async Task<IActionResult> DeleteBranch(int id)
        {
            var branch = await _context.Branches.FindAsync(id);
            if (branch == null)
            {
                return NotFound();
            }
            if(branch.Representatives.Count > 0)
            {
                return BadRequest("المناديب المسجلين بهذا الفرع: " + branch.Representatives.Count);
            }
            _context.Branches.Remove(branch);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool BranchExists(int id)
        {
            return _context.Branches.Any(e => e.Id == id);
        }

    }
}
