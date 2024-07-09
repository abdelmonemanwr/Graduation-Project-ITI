using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShippingSystem.Models
{
    public class GroupPrivilege
    {
        [Key]
        public int Id { get; set; }

        public bool? Add { get; set; }

        public bool? Update { get; set; }

        public bool? View { get; set; }

        public bool? Delete { get; set; }

        [ForeignKey("Group")]
        public string? Group_Id { get; set; }

        [ForeignKey("Privilege")]
        public int? Privelege_Id { get; set; }

        public virtual Privilege? Privilege { get; set; }

        public virtual Group? Group { get; set; }
    }
}
