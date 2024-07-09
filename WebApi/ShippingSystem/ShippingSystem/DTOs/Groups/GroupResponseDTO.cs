namespace ShippingSystem.DTOs.Groups
{
    public class GroupResponseDTO
    {
        public string Name { get; set; }
        public DateTime DateAdded { get; set; }
        public List<GroupPrivilegeDTO> GroupPrivileges { get; set; }
    }
}
