using System.ComponentModel.DataAnnotations.Schema;

namespace ShippingSystem.Models
{
    public class SpecialPrice
    {
        public int Id { get; set; }

        public int? TransportCost { get; set;}

        [ForeignKey("Governate")]
        public int? Governate_Id { get; set; }

        public virtual Governate Governate { get; set; }

        [ForeignKey("City")]
        public int? City_Id { get; set; }

        public virtual City? City { get; set; }


        [ForeignKey("Merchant")]
        public string Merchant_Id { get; set; }

        public virtual Merchant? Merchant { get; set; }

        


    }


}
