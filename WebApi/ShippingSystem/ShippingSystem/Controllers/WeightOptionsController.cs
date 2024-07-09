using Microsoft.AspNetCore.Mvc;
using ShippingSystem.DTOs.WeightOption;
using ShippingSystem.Models;
using ShippingSystem.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ShippingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeightOptionsController : ControllerBase
    {
        private readonly WeightOptionService _weightOptionService;

        public WeightOptionsController(WeightOptionService weightOptionService)
        {
            _weightOptionService = weightOptionService;
        }

        // GET: api/WeightOptions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WeightOption>>> GetWeightOptions()
        {
            var weightOptions = await _weightOptionService.GetAllWeightOptions();

            return Ok(weightOptions);
        }

        // GET: api/WeightOptions/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<WeightOption>> GetWeightOption(int id)
        {
            var weightOption = await _weightOptionService.GetWeightOptionById(id);

            if (weightOption == null)
            {
                return NotFound();
            }

            return Ok(weightOption);
        }

        // POST: api/WeightOptions
        [HttpPost]
        public async Task<ActionResult<WeightOption>> CreateWeightOption([FromBody] WeightOptionDTO weightOptionDto)
        {
            if (weightOptionDto == null)
            {
                return BadRequest("WeightOptionDTO is null");
            }

            try
            {
                var weightOption = await _weightOptionService.AddOrUpdateWeightOption(weightOptionDto);

                return CreatedAtAction(nameof(GetWeightOption), new { id = weightOption.Id }, weightOption);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/WeightOptions/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWeightOption(int id, [FromBody] WeightOptionDTO weightOptionDto)
        {
            if (weightOptionDto == null)
            {
                return BadRequest("WeightOptionDTO is null");
            }

            try
            {
                var updatedWeightOption = await _weightOptionService.UpdateWeightOption(id, weightOptionDto);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        // DELETE: api/WeightOptions/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWeightOption(int id)
        {
            try
            {
                await _weightOptionService.DeleteWeightOption(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }
    }
}
