using System.ComponentModel.DataAnnotations.Schema;

namespace ShippingSystem.DTOs.Groups
{
    public class GroupPrivilegeDTO
    {
        public bool? Add { get; set; }

        public bool? Update { get; set; }

        public bool? View { get; set; }

        public bool? Delete { get; set; }

        public int? Privelege_Id { get; set; }
    }
}
