namespace ShippingSystem.DTOs
{
    public class EmployeeDTO
    {
        public string Id { get; set; }

        public string? FullName { get; set; }

        public string? UserName { get; set; }

        public string? Email { get; set; } 

        public string? Phone { get; set; } 

        public string? Password { get; set; }

        public int? BranchId { get; set; }

        public string? BranchName { get; set; }

        public List<string>? Roles { get; set; } 

        public bool? Status { get; set; }
    }
}
