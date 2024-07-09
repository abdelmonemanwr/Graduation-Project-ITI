using ShippingSystem.DTOs.Privileges;
using ShippingSystem.Models;

namespace ShippingSystem.Services
{
    public interface IPrivilegeControllerService
    {
        public Task<List<PrivilegeDTO?>> GetAllPrivilegesAsync();
    }
}