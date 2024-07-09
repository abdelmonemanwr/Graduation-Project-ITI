using Server.DTOs.Passwords;
using ShippingSystem.DTOs.Authentication;
using ShippingSystem.DTOs.Groups;
using ShippingSystem.DTOs.Passwords;
using System.Security.Claims;

namespace ShippingSystem.Services
{
    public interface IAccountControllerService
    {
        public Task<AuthResponseDTO> Logout();
        public Task<List<UserDetailsDTO>> GetAllUsers();
        public Task<AuthResponseDTO> Login(LoginDTO loginDTO);
        public Task<UserDetailsDTO>  GetUserDetails(ClaimsPrincipal userClaims);
        public Task<AuthResponseDTO> ResetPassword(ResetPasswordDTO resetPasswordDTO);
        public Task<AuthResponseDTO> ForgetPassword(ForgetPasswordDTO forgetPasswordDTO);
        public Task<AuthResponseDTO> Register(RegisterDTO registerDTO);

        public Task<List<GroupPrivilegeDTO?>> GetPrivilegesByGroupNameAsync(string groupName);
        public Task<string> GetRoleIdAsync(ClaimsPrincipal userClaims);
    }
}
