using Microsoft.AspNetCore.Identity;

namespace ShippingSystem.Models
{
    public class Privilege 
    {

        public int ? Id { get; set; }

        public string ? Name { get; set; }

        public virtual ICollection<GroupPrivilege> Privileges { get; set; } = new List<GroupPrivilege>();
    }
}
