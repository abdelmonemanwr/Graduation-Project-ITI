namespace ShippingSystem.DTOs.Representatives
{
    public class RepresentativeDTO
    {
        public string id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public int CompanyOrderPrecentage { get; set; }
        public int SalePrecentage { get; set; }
        public string Password { get; set; }
        public int Branch_Id { get; set; }
        public List<int> GovernateIds { get; set; }
    }
}
