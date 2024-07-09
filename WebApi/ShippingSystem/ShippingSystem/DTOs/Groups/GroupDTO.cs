using ShippingSystem.Models;

namespace ShippingSystem.DTOs.Groups
{
    public class GroupDTO
    {
        public string Name { get; set; }
        public List<GroupPrivilegeDTO> GroupPrivileges { get; set; } = new List<GroupPrivilegeDTO>();
    }
}
