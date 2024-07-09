using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RestSharp;
using Server.DTOs.Passwords;
using ShippingSystem.DTOs.Authentication;
using ShippingSystem.DTOs.Groups;
using ShippingSystem.DTOs.Passwords;
using ShippingSystem.Models;
using ShippingSystem.UnitOfWorks;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace ShippingSystem.Services
{
    public class AccountControllerService : IAccountControllerService
    {
        private readonly IMapper mapper;
        private IConfiguration configuration;
        private UserManager<ApplicationUser> userManager;
        private readonly IUnitOfWork unitOfWork;

        public AccountControllerService(IMapper mapper, UserManager<ApplicationUser> userManager, IConfiguration configuration, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.userManager = userManager;
            this.configuration = configuration;
            this.unitOfWork = unitOfWork;
        }

        private Task<string> GetUserRole(ApplicationUser applicationUser) 
        {
            return Task.FromResult(userManager.GetRolesAsync(applicationUser).Result.FirstOrDefault() ?? "");
        }
        private Task<string> GenerateToken(ApplicationUser applicationUser, bool? rememberMe)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, applicationUser.Id ?? ""),
                new Claim(JwtRegisteredClaimNames.Email, applicationUser.Email ?? ""),
                new Claim(JwtRegisteredClaimNames.Name, applicationUser.FullName ?? ""),
                new Claim(JwtRegisteredClaimNames.Iss, configuration.GetSection("JwtSettings").GetSection("ValidIssuer").Value ?? ""),
                new Claim(JwtRegisteredClaimNames.Aud, configuration.GetSection("JwtSettings").GetSection("ValidAudience").Value ?? ""),
                new Claim("phoneNumber", applicationUser.PhoneNumber ?? ""),
                new Claim("phoneNumberConfirmed", applicationUser.PhoneNumberConfirmed.ToString() ?? ""),
                new Claim("twoFactorEnabled", applicationUser.TwoFactorEnabled.ToString() ?? ""),
                new Claim("accessFailedCount", applicationUser.AccessFailedCount.ToString() ?? "")
            };

            var roles = userManager.GetRolesAsync(applicationUser).Result;
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            DateTime expiration = rememberMe == true ? DateTime.UtcNow.AddDays(7) : DateTime.UtcNow.AddDays(1);

            var key = Encoding.ASCII.GetBytes(configuration.GetSection("JwtSettings").GetSection("securityKey").Value!);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512),
                Subject = new ClaimsIdentity(claims),
                Expires = expiration,
                Issuer = configuration.GetSection("JwtSettings").GetSection("ValidIssuer").Value,
                Audience = configuration.GetSection("JwtSettings").GetSection("ValidAudience").Value
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));
            return Task.FromResult(token);
        }

        public async Task<AuthResponseDTO> Login(LoginDTO loginDTO)
        {
            ApplicationUser? user = await userManager.FindByEmailAsync(loginDTO.Email);

            if (user is null)
            {
                return new AuthResponseDTO
                {
                    isSuccess = false,
                    Message = "No user with the provided credentials :("
                };
            }

            var result = await userManager.CheckPasswordAsync(user, loginDTO.Password);
            if (!result)
            {
                return new AuthResponseDTO
                {
                    isSuccess = false,
                    Message = "No user with the provided credentials :("
                };
            }

            string token = await GenerateToken(user, loginDTO.RememberMe);
            string role = await GetUserRole(user);
            return new AuthResponseDTO
            {
                isSuccess = true,
                Token = token,
                Message = "Login successful",
                Role = role
            };
        }

        public Task<AuthResponseDTO> Logout()
        {
            return Task.FromResult(new AuthResponseDTO
            {
                isSuccess = true,
                Message = "User logged out successfully."
            });
        }

        public async Task<AuthResponseDTO> ForgetPassword(ForgetPasswordDTO forgetPasswordDTO)
        {
            ApplicationUser? user = await userManager.FindByEmailAsync(forgetPasswordDTO.Email);
            if (user is null)
            {
                return new AuthResponseDTO
                {
                    isSuccess = false,
                    Message = "No user with the provided email"
                };
            }

            var token = await userManager.GeneratePasswordResetTokenAsync(user);

            var resetLink = $"https://localhost:4200/ResetPassword";

            var client = new RestClient("https://send.api.mailtrap.io/api/send");

            var request = new RestRequest
            {
                Method = Method.Post,
                RequestFormat = DataFormat.Json
            };

            request.AddHeader("Authorization", "Bearer c5c769ea9a69263ae140f14a2ad4eb88");
            request.AddJsonBody(new
            {
                from = new { email = "mailtrap@demomailtrap.com" },
                to = new[] { new { email = user.Email } },
                template_uuid = "bf9d7420-ed87-467e-9ad1-d6bd0c0193b3",
                template_variables = new
                {
                    user_email = user.Email,
                    pass_reset_link = resetLink,
                    token = token
                }
            });

            var response = client.Execute(request);
            if (response.IsSuccessful)
            {
                return new AuthResponseDTO
                {
                    isSuccess = true,
                    Message = "An email with password reset link has been sent to your email, Please check your inbox"
                };
            }
            else
            {
                return new AuthResponseDTO
                {
                    isSuccess = false,
                    Message = response.Content!.ToString()
                };
            }
        }

        public async Task<AuthResponseDTO> ResetPassword(ResetPasswordDTO resetPasswordDTO)
        {
            var user = await userManager.FindByEmailAsync(resetPasswordDTO.Email);
            if (user == null)
            {
                return new AuthResponseDTO
                {
                    isSuccess = false,
                    Message = "Invalid email address"
                };
            }
            var passwordToken = await userManager.GeneratePasswordResetTokenAsync(user);
            var resetPassResult = await userManager.ResetPasswordAsync(user, passwordToken, resetPasswordDTO.NewPassword);
            if (!resetPassResult.Succeeded)
            {
                return new AuthResponseDTO
                {
                    isSuccess = false,
                    //Message = "Password reset failed",
                    Message = string.Join(" - ", resetPassResult.Errors.Select(e => e.Description).ToList())
            };
            }

            return new AuthResponseDTO
            {
                isSuccess = true,
                Message = "Password has been reset successfully"
            };
        }

        public async Task<UserDetailsDTO?> GetUserDetails(ClaimsPrincipal userClaims)
        {
            var appUserId = userClaims.FindFirstValue(ClaimTypes.NameIdentifier);
            if (appUserId == null)
            {
                return null;
            }

            var appUser = await userManager.FindByIdAsync(appUserId);
            if (appUser == null)
            {
                return null;
            }

            var userDetails = mapper.Map<UserDetailsDTO>(appUser);
            userDetails.Roles = (await userManager.GetRolesAsync(appUser)).ToList();

            return userDetails;
        }

        public async Task<List<UserDetailsDTO>> GetAllUsers()
        {
            var users = await userManager.Users.ToListAsync();
            var userDetailsDTOs = new List<UserDetailsDTO>();

            foreach (var user in users)
            {
                var userDetailsDTO = mapper.Map<UserDetailsDTO>(user);
                userDetailsDTO.Roles = (await userManager.GetRolesAsync(user)).ToList();
                userDetailsDTOs.Add(userDetailsDTO);
            }

            return userDetailsDTOs;
        }

        public async Task<AuthResponseDTO> Register(RegisterDTO registerDTO)
        {
            var admin = mapper.Map<ApplicationUser>(registerDTO);
            
            if (registerDTO.Password != registerDTO.ConfirmPassword)
            {
                return new AuthResponseDTO
                {
                    isSuccess = false,
                    Message = "Passwords aren't matched ..."
                };
            }

            var result = await userManager.CreateAsync(admin, registerDTO.Password);

            if (!result.Succeeded)
            {
                return new AuthResponseDTO
                {
                    isSuccess = false,
                    Message = string.Join(" - ", result.Errors.Select(e => e.Description))
                };
            }
            var role = "admin";
            await userManager.AddToRoleAsync(admin, role);
            return new AuthResponseDTO
            {
                isSuccess = true,
                Message = $"{admin.FullName} becomes Admin :)",
                Role = role,
            };

        }


        public async Task<string> GetRoleIdAsync(ClaimsPrincipal userClaims)
        {
            //return await unitOfWork.EmployeeRepository.GetRoleIdByUserId(ClaimTypes.NameIdentifier);
            var userId = userClaims.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                throw new Exception("User ID is not found in the claims.");
            }
            return await unitOfWork.EmployeeRepository.GetRoleIdByUserId(userId);
        }

        public async Task<List<GroupPrivilegeDTO?>> GetPrivilegesByGroupNameAsync(string roleId)
        {
            var group = await unitOfWork.GroupRepository.GetById(roleId);
            if (group == null)
            {
                return new List<GroupPrivilegeDTO?>();
            }
            var groupPrivileges = await unitOfWork.GroupPrivilegeRepository.GetGroupPrivilegesByGroupId(group.Id);
            return mapper.Map<List<GroupPrivilegeDTO?>>(groupPrivileges);
        }
    }
}