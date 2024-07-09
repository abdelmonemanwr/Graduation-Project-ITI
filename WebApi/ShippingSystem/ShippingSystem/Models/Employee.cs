using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShippingSystem.Models
{
    public class Employee : ApplicationUser
    {
        //public string? FullName { set; get; }

        public bool? Status { set; get; }

        [ForeignKey("Branch")]
        public int? Branch_Id { get; set; }

        public virtual Branch? Branch { get; set; }

        //public virtual ICollection<Privilege>? Privileges { get; set; } = new List<Privilege>();
        
    }
}
