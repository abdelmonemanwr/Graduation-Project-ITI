using System.ComponentModel.DataAnnotations.Schema;

namespace ShippingSystem.DTOs.Order
{
    public class ProductOrderDto
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public int? Quantity { get; set; }

        public int? UnitPrice { get; set; }

        public int? UnitWeight { get; set; }

        public int? Order_Id { get; set; }

    }
}
