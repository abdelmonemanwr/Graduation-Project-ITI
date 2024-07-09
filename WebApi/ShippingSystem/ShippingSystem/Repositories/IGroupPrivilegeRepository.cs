using ShippingSystem.DTOs.Groups;
using ShippingSystem.Models;

namespace ShippingSystem.Repositories
{
    public interface IGroupPrivilegeRepository
    {
        public Task<List<GroupPrivilege?>> GetGroupPrivilegesByGroupId(string groupId);
    }
}
