namespace ShippingSystem.Models
{
    public class Branch
    {

        public int Id { get; set; }

        public string? Name { get; set; }

        public bool? Status { get; set; }

        public DateTime? AddingDate { get; set; }

        public virtual ICollection<Employee> Employees { get; set; } = new List<Employee>();

        public virtual ICollection<Merchant> Merchants { get; set; } = new List<Merchant>();

        public virtual ICollection<Representative> Representatives { get; set;} = new List<Representative>();
    }
}
