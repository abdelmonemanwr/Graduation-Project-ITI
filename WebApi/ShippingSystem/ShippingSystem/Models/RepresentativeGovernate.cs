using System.ComponentModel.DataAnnotations.Schema;

namespace ShippingSystem.Models
{
    public class RepresentativeGovernate
    {
        
        [ForeignKey("Representative")]
        public string Representative_Id {  get; set; }

        [ForeignKey("Governate")]
        public int Governate_Id { get; set; }

        public virtual Governate? Governate { get; set; }

        
        public virtual Representative? Representative {  get; set; } 
    }
}
