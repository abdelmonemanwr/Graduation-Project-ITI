using System.ComponentModel.DataAnnotations.Schema;

namespace ShippingSystem.Models
{
    public class ProductOrder
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public int? Quantity { get; set;}

        public int? UnitPrice { get; set;}

        public int? UnitWeight { get; set; }

        [ForeignKey("Order")]
        public int? Order_Id { get; set;}

        public virtual Order? Order { get; set; } 
    }
}
