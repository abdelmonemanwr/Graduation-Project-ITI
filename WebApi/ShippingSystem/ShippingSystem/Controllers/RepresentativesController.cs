using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShippingSystem.DTOs.Representatives;
using ShippingSystem.Models;
using System.Collections.Generic;
using System.Net.NetworkInformation;
using System.Threading.Tasks;

namespace ShippingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RepresentativesController : ControllerBase
    {
        private readonly ShippingContext _context;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<Group> _roleManager;

        public RepresentativesController(ShippingContext context, UserManager<ApplicationUser> _userManager, RoleManager<Group> roleManager)
        {
            _context = context;
            userManager = _userManager;
            _roleManager = roleManager;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RepresentativeDtoGET>>> GetRepresentatives()
        {
            var representatives = await _context.Representatives.Where(r => r.IsDeleted == false)
                .Select(r => new RepresentativeDtoGET
                {
                    Id = r.Id,
                    FullName = r.FullName,
                    Email = r.Email,
                    PhoneNumber = r.PhoneNumber,
                    Address = r.Address,
                    Password = r.PasswordHash,
                    CompanyOrderPrecentage = r.CompanyOrderPrecentage,
                    SalePrecentage = r.SalePrecentage,
                    Branch_Id = r.Branch.Id,
                    BranchName = r.Branch.Name,
                    LockoutEnabled = r.LockoutEnabled,
                    Governorates = r.RepresentativeGovernates
                        .Select(g => new RepresentativeGovernateDTO
                        {
                            Id = g.Governate.Id,
                            Name = g.Governate.Name,
                            Status = g.Governate.Status
                        })
                        .ToList()
                })
                .ToListAsync();
            if (representatives == null)
            {
                return NotFound(new { message = "no representatives found" });
            }
            return Ok(representatives);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Representative>> GetRepresentative(string id)
        {
            var r = await _context.Representatives.FindAsync(id);

            if (r == null)
            {
                return NotFound(new { message = "no representatives found" });
            }
            if(r.IsDeleted == true)
            {
                return NotFound(new { message = "representatives found but deleted" });
            }

            var returned = new RepresentativeDtoGET
            {
                Id = r.Id,
                FullName = r.FullName,
                Email = r.Email,
                PhoneNumber = r.PhoneNumber,
                Address = r.Address,
                Password = r.PasswordHash,
                CompanyOrderPrecentage = r.CompanyOrderPrecentage,
                SalePrecentage = r.SalePrecentage,
                Branch_Id = r.Branch.Id,
                BranchName = r.Branch.Name,
                LockoutEnabled = r.LockoutEnabled,
                Governorates = r.RepresentativeGovernates
                         .Select(g => new RepresentativeGovernateDTO
                         {
                             Id = g.Governate.Id,
                             Name = g.Governate.Name,
                             Status = g.Governate.Status
                         })
                         .ToList()
            };

            return Ok(returned);
        }

        [HttpPost]
        public async Task<ActionResult<Representative>> PostRepresentative(RepresentativeDTO representativeDto)
        {
            var representative = new Representative
            {
                FullName = representativeDto.FullName,
                PhoneNumber = representativeDto.PhoneNumber,
                UserName = representativeDto.Email,
                Email = representativeDto.Email,
                Address = representativeDto.Address,
                CompanyOrderPrecentage = representativeDto.CompanyOrderPrecentage,
                SalePrecentage = representativeDto.SalePrecentage,
                Branch_Id = representativeDto.Branch_Id,
                PasswordHash = representativeDto.Password
            };

            foreach (var governateId in representativeDto.GovernateIds)
            {
                representative.RepresentativeGovernates.Add(new RepresentativeGovernate
                {
                    Governate_Id = governateId,
                    Representative = representative
                });
            }
            var passwordHasher = new PasswordHasher<Representative>();
            representative.PasswordHash = passwordHasher.HashPassword(representative, representativeDto.Password);
            _context.Representatives.Add(representative);
            await _context.SaveChangesAsync();
            await EnsureRoleExistsAsync("representative");         
            var rolesResult = await userManager.AddToRoleAsync(representative, "representative");
            if (!rolesResult.Succeeded)
            {
                return BadRequest(rolesResult);
            } 
            return CreatedAtAction("GetRepresentative", new { id = representative.Id }, representative);
        }

        private async Task EnsureRoleExistsAsync(string roleName)
        {
            var roleExists = await _roleManager.RoleExistsAsync(roleName);
            if (!roleExists)
            {
                var role = new Group();
                role.DateAdded = DateTime.UtcNow;
                role.Name = roleName;
                var result = await _roleManager.CreateAsync(role);
                if (!result.Succeeded)
                {
                    throw new Exception($"Failed to create role '{roleName}': {string.Join(", ", result.Errors.Select(e => e.Description))}");
                }
            }
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> PutRepresentative(string id, RepresentativeDTO representativeDto)
        {
            if (id != representativeDto.id)
            {
                return BadRequest(new { message = "not valid id" });
            }

            var representative = await _context.Representatives
                .Include(r => r.RepresentativeGovernates)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (representative == null)
            {
                return NotFound();
            }

            representative.FullName = representativeDto.FullName;
            representative.PhoneNumber = representativeDto.PhoneNumber;
            representative.Email = representativeDto.Email;
            representative.Address = representativeDto.Address;
            representative.CompanyOrderPrecentage = representativeDto.CompanyOrderPrecentage;
            representative.SalePrecentage = representativeDto.SalePrecentage;
            representative.Branch_Id = representativeDto.Branch_Id;
            // Check if the password needs to be updated
            var passwordHasher = new PasswordHasher<Representative>();
            var verificationResult = passwordHasher.VerifyHashedPassword(representative, representative.PasswordHash, representativeDto.Password);

            if (verificationResult == PasswordVerificationResult.Failed)
            {
                representative.PasswordHash = passwordHasher.HashPassword(representative, representativeDto.Password);
            }

            // Update RepresentativeGovernates
            representative.RepresentativeGovernates.Clear();
            foreach (var governateId in representativeDto.GovernateIds)
            {
                representative.RepresentativeGovernates.Add(new RepresentativeGovernate
                {
                    Governate_Id = governateId,
                    Representative = representative
                });
            }
            _context.Representatives.Update(representative);
            await _context.SaveChangesAsync();
            return Ok(new { message = "representative updated successfully" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRepresentative(string id)
        {
            var representative = await _context.Representatives.FindAsync(id);
            if (representative == null)
            {
                return NotFound();
            }
            representative.IsDeleted = true;
            _context.Representatives.Update(representative);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RepresentativeExists(string id)
        {
            return _context.Representatives.Any(e => e.Id == id);
        }


        [HttpGet("governorates")]
        public async Task<ActionResult<IEnumerable<RepresentativeGovernateDTO>>> GetGovernorates()
        {
            var governorates = await _context.Governates
                .Select(g => new RepresentativeGovernateDTO
                {
                    Id = g.Id,
                    Name = g.Name,
                    Status = g.Status
                })
                .ToListAsync();

            return Ok(governorates);
        }
        [HttpGet("branches")]
        public async Task<ActionResult<IEnumerable<RepresentativeGovernateDTO>>> GetBranches()
        {
            var branches = await _context.Branches
                .Select(g => new RepresentativeGovernateDTO
                {
                    Id = g.Id,
                    Name = g.Name,
                    Status = g.Status
                })
                .ToListAsync();

            return Ok(branches);
        }
    }
}
