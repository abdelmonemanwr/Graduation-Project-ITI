using Microsoft.AspNetCore.Mvc;
using ShippingSystem.DTOs.VillageCost;
using ShippingSystem.Models;
using ShippingSystem.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShippingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VillageCostController : ControllerBase
    {
        private readonly VillageCostService _villageCostService;

        public VillageCostController(VillageCostService villageCostService)
        {
            _villageCostService = villageCostService;
        }

        // GET: api/VillageCost
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VillageCost>>> GetVillageCosts()
        {
            var villageCosts = await _villageCostService.GetAllVillageCosts();

            return Ok(villageCosts);
        }

        // GET: api/VillageCost/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<VillageCost>> GetVillageCost(int id)
        {
            var villageCost = await _villageCostService.GetVillageCostById(id);

            if (villageCost == null)
            {
                return NotFound();
            }

            return Ok(villageCost);
        }

        // POST: api/VillageCost
        [HttpPost]
        public async Task<ActionResult<VillageCost>> CreateVillageCost([FromBody] VillageCostDTO villageCostDto)
        {
            if (villageCostDto == null)
            {
                return BadRequest("VillageCostDTO is null");
            }

            try
            {
                var villageCost = await _villageCostService.AddVillageCost(villageCostDto);

                return CreatedAtAction(nameof(GetVillageCost), new { id = villageCost.Id }, villageCost);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/VillageCost/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVillageCost(int id, [FromBody] VillageCostDTO villageCostDto)
        {
            if (villageCostDto == null)
            {
                return BadRequest("VillageCostDTO is null");
            }

            try
            {
                var updatedVillageCost = await _villageCostService.UpdateVillageCost(id, villageCostDto);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        // DELETE: api/VillageCost/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVillageCost(int id)
        {
            try
            {
                await _villageCostService.DeleteVillageCost(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }
    }
}
