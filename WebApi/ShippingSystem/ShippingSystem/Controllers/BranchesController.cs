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
    public class BranchesController : ControllerBase
    {
        private readonly ShippingContext _context;

        public BranchesController(ShippingContext context)
        {
            _context = context;
        }

        [HttpGet]
        [AllowAnonymous]
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
        [AllowAnonymous]
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
        [Authorize(Roles = "admin")]
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
        [Authorize(Roles = "admin")]
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
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteBranch(int id)
        {
            var branch = await _context.Branches.FindAsync(id);
            if (branch == null)
            {
                return NotFound();
            }
            var activeRepresentativesCount = branch.Representatives.Count(r => !r.IsDeleted);
            if (activeRepresentativesCount > 0)
            {
                var response = new
                {
                    message = "المناديب المسجلين بهذا الفرع: " + activeRepresentativesCount
                };
                return BadRequest(response);
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
