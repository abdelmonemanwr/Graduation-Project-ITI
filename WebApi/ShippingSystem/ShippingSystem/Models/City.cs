using System.ComponentModel.DataAnnotations.Schema;

namespace ShippingSystem.Models
{
    public class City
    {

        public int Id { get; set; }

        public string? Name { get; set;}

        public int? NormalCost {  get; set; }

        public int? PickUpCost { get; set; }


        [ForeignKey("Governate")]
        public int? Governate_Id { get; set; }

        public virtual Governate? Governate { get; set; }

    }
}
