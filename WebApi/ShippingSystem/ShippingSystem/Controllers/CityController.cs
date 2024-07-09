using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShippingSystem.DTOS.City;
using ShippingSystem.Models;
using ShippingSystem.Services;

namespace ShippingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly CityService cityService;

        public CityController(CityService _cityService)
        {
            cityService = _cityService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CityDto>>> GetCities([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var cities = await cityService.GetCitiesAsync(pageNumber, pageSize);
            if (cities == null)
            {
                return NotFound(new { message = "there are no cities" });
            }
            return Ok(cities);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<IEnumerable<CityDto>>> GetCityById(int id)
        {
            var city = await cityService.GetCityByIdAsync(id);

            if (city == null)
            {
                return NotFound(new { message = "no city with this id" });

            }
            return Ok(city);
        }

        [HttpGet("governate/{id:int}")]
        public async Task<ActionResult<IEnumerable<CityDto>>> GetCityByGovernateId(int id)
        {
            var city = await cityService.GetCityByGovernateAsync(id);

            if (city == null)
            {
                return NotFound(new { message = "no city related to this governate" });

            }
            return Ok(city);
        }



        [HttpGet("{name}")]
        public async Task<ActionResult> GetCityByName(string name)
        {
            var city = await cityService.GetCityByNameAsync(name);
            if (city == null)
            {
                return NotFound(new { message = "no city with this name" });

            }
            return Ok(city);
        }

        [HttpPost]
        public async Task<ActionResult<CityDto>> AddCity(CityDto cityDto)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);

            }
            await cityService.PostCityAsync(cityDto);
            return Ok(new { message = "city added successfully" });
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateCity(int id,CityDto cityDto )
        {
            if (!ModelState.IsValid || cityDto.Id != id)
            {
                return BadRequest(ModelState);
            }

            await cityService.PutCityAsync(cityDto);
            return Ok(new { message = "city updated succefully" });
        }


        [HttpDelete("{id:int}")]
        public async Task<ActionResult<CityDto>> DeleteCity(int id)
        {

            var city = await cityService.RemoveCityAsync(id);
            if (city == true)
                return Ok(new { message = "city deleted successfully" });

            else
                return NotFound(new { message = "no city found to delete" });
        }
    }
}
