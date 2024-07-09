using AutoMapper;
using System.Text;
using System.Diagnostics;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using ShippingSystem.DTOs.Authentication;
using Microsoft.EntityFrameworkCore;
using System.Net;
using RestSharp;
using ShippingSystem.Models;
using ShippingSystem.Services;
using Server.DTOs.Passwords;
using ShippingSystem.DTOs.Passwords;
using Microsoft.AspNetCore.Cors;

namespace ShippingSystem.Controllers
{
    [Authorize]
    [ApiController]
    [EnableCors("AllowSpecificOrigin")]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [Consumes("application/json")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountControllerService accountControllerService;

        public AccountController(IAccountControllerService accountControllerService)
        {
            this.accountControllerService = accountControllerService;
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<ActionResult<AuthResponseDTO>> Login(LoginDTO loginDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new AuthResponseDTO 
                { 
                    isSuccess = false, 
                    Message = "Invalid payload" 
                });
            }
            try
            {
                var authResponse = await accountControllerService.Login(loginDTO);
                if (!authResponse.isSuccess)
                {
                    return Unauthorized(authResponse);
                }
                return Ok(authResponse);
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Exception: {ex.Message}");
                return StatusCode(502, new AuthResponseDTO
                {
                    isSuccess = false,
                    Message = "An error occurred while processing your request."
                });
            }
        }

        [HttpPost("Logout")]
        public async Task<ActionResult<AuthResponseDTO>> Logout()
        {
            try
            {
                var authResponse = await accountControllerService.Logout();
                if (!authResponse.isSuccess)
                {
                    return BadRequest(authResponse);
                }
                return Ok(authResponse);
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Exception: {ex.Message}");
                return StatusCode(502, new AuthResponseDTO
                {
                    isSuccess = false,
                    Message = "An error occurred while processing your request."
                });
            }
        }

        [AllowAnonymous]
        [HttpPost("ForgetPassword")]
        public async Task<ActionResult> ForgetPassword(ForgetPasswordDTO forgetPasswordDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new AuthResponseDTO
                {
                    isSuccess = false,
                    Message = "Invalid payload"
                });
            }
            try
            {
                var authResponse = await accountControllerService.ForgetPassword(forgetPasswordDTO);
                if (!authResponse.isSuccess)
                {
                    return BadRequest(authResponse);
                }
                return Ok(authResponse);
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Exception: {ex.Message}");
                return StatusCode(502, new AuthResponseDTO
                {
                    isSuccess = false,
                    Message = "An error occurred while processing your request."
                });
            }
        }

        [AllowAnonymous]
        [HttpPost("ResetPassword")]
        public async Task<ActionResult> ResetPassword(ResetPasswordDTO resetPasswordDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new AuthResponseDTO
                {
                    isSuccess = false,
                    Message = "Invalid payload"
                });
            }
            try
            {
                var authResponse = await accountControllerService.ResetPassword(resetPasswordDTO);
                if (!authResponse.isSuccess)
                {
                    return BadRequest(authResponse);
                }
                return Ok(authResponse);
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Exception: {ex.Message}");
                return StatusCode(502, new AuthResponseDTO
                {
                    isSuccess = false,
                    Message = "An error occurred while processing your request."
                });
            }
        }

        [AllowAnonymous]
        [HttpGet("GetUserDetails")]
        public async Task<IActionResult> GetUserDetails()
        {
            var userDetails = await accountControllerService.GetUserDetails(User);
            if (userDetails == null)
            {
                return NotFound(new AuthResponseDTO
                {
                    isSuccess = false,
                    Message = "User not found"
                });
            }
            return Ok(userDetails);
        }

        [HttpGet("GetAllUsers")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await accountControllerService.GetAllUsers();
                return Ok(users);
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Exception: {ex.Message}");
                return StatusCode(502, new AuthResponseDTO
                {
                    isSuccess = false,
                    Message = "An error occurred while processing your request."
                });
            }
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<ActionResult> Register(RegisterDTO registerDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var authResponse = await accountControllerService.Register(registerDTO);
                if (!authResponse.isSuccess)
                {
                    return BadRequest(authResponse);
                }
                return Ok(authResponse);
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"Exception: {ex.Message}");
                return StatusCode(500, new AuthResponseDTO
                {
                    isSuccess = false,
                    //Message = "An error occurred while processing your request."
                    Message = ex.Message
                });
            }

        }

        [HttpGet("GetUserPrivilegesByUserId")]
        public async Task<ActionResult> GetUserPrivilegesByUserId()
        {
            try
            {
                var roleId = await accountControllerService.GetRoleIdAsync(User);
                var groupPrivielgesDTO = await accountControllerService.GetPrivilegesByGroupNameAsync(roleId);
                return Ok(groupPrivielgesDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}