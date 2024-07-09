using Microsoft.AspNetCore.Mvc;
using ShippingSystem.DTOs.Privileges;
using ShippingSystem.Models;
using ShippingSystem.Services;

namespace ShippingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrivilegeController : ControllerBase
    {
        private readonly IPrivilegeControllerService privilegeControllerService;

        public PrivilegeController(IPrivilegeControllerService privilegeControllerService)
        {
            this.privilegeControllerService = privilegeControllerService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                return Ok(await privilegeControllerService.GetAllPrivilegesAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetPrivilegeById/{id}")]
        public async Task<ActionResult<PrivilegeDTO>> GetPrivilegeById(int id)
        {
            try
            {
                return Ok(await privilegeControllerService.GetPrivilegeNameById(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}