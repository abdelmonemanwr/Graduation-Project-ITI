using ShippingSystem.Models;

namespace ShippingSystem.DTOs.Representatives
{
    public class RepresentativeDtoGET
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string? Password { get; set; }
        public float? CompanyOrderPrecentage { get; set; }
        public float? SalePrecentage { get; set; }
        public int Branch_Id { get; set; }
        public string? BranchName { get; set; }
        public bool? LockoutEnabled { get; set; }
        public List<RepresentativeGovernateDTO> Governorates { get; set; }
    }
}
