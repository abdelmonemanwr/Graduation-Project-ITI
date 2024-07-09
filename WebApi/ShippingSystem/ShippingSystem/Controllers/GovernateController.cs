using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShippingSystem.DTOS.Governate;
using ShippingSystem.Models;
using ShippingSystem.Services;

namespace ShippingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GovernateController : ControllerBase
    {
        private readonly GovernateService governateService;

        public GovernateController(GovernateService _governateService)
        {
            governateService = _governateService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GovernateDto>>> GetGovernates([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var governates = await governateService.GetGovernatesAsync(pageNumber, pageSize);
            if(governates == null) 
            {
                return NotFound( new { message = "there are no governates" });
            }

            return Ok(governates);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<IEnumerable<Governate>>> GetGovernateById(int id)
        {
            var governate = await governateService.GetGovernatesByIdAsync(id);

            if (governate == null )
            {
                return NotFound(new { message = "no governate with this id" });

            }
            return Ok(governate);
        }



        [HttpGet("{name}")]
        public async Task<ActionResult> GetGovernateByName(string name)
        {
            var governate = await governateService.GetGovernatesByNameAsync(name);
            if (governate == null)
            {
                return NotFound(new { message = "no governate with this name" });

            }
            return Ok(governate);
        }

        [HttpPost]
        public async Task<ActionResult<GovernateDto>> AddGovernate(GovernateDto governateDto)
        {
          
            if(!ModelState.IsValid) 
            { 
                return BadRequest(ModelState);
            
            }
            await governateService.PostGovernateAsync(governateDto);
            return Ok(new { message = "governate added successfully" });
        }

        //[all]
        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateGovernate(int id ,GovernateDto governateDto)
        {
            if (!ModelState.IsValid || governateDto.Id != id)
            {
                return BadRequest(ModelState);
            }

            await governateService.PutGovernateAsync(governateDto);
            return Ok( new { message = "governate updated succefully" });
        }


        [HttpDelete("{id:int}")]
        public async Task<ActionResult<GovernateDto>> DeleteGovernate(int id)
        {
           
           var governate = await governateService.RemoveGovernateAsync(id);
            if (governate == true)

                return Ok(new { message = "governate deleted successfully" });

            else
                return NotFound(new { message = "no governate found to delete" });
        }




    }
}
