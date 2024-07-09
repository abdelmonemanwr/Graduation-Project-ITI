using ShippingSystem.DTOs.Groups;
using ShippingSystem.DTOs.Privileges;
using ShippingSystem.Models;
using System.Security.Claims;

namespace ShippingSystem.Services
{
    public interface IPrivilegeControllerService
    {
        public Task<List<PrivilegeDTO?>> GetAllPrivilegesAsync();
        public Task<PrivilegeDTO?> GetPrivilegeNameById(int id);
    }
}