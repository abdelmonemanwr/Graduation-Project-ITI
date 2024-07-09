using System.ComponentModel.DataAnnotations.Schema;

namespace ShippingSystem.Models
{
    public class Governate
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public bool? Status { get; set; }

        public virtual ICollection<City>? Cities { get; set; } = new List<City>();

        public virtual ICollection<RepresentativeGovernate>? RepresentativeGovernates { get; set; } = new List<RepresentativeGovernate>();

    }
}
