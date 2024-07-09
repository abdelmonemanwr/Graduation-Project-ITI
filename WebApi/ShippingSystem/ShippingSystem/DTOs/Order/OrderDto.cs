using ShippingSystem.Enumerations;
using ShippingSystem.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShippingSystem.DTOs.Order
{
    public class OrderDto
    {
        public int Id { get; set; }

        public string? CustomerName { get; set; }

        public string? CustomerPhone1 { get; set; }

        public string? CustomerPhone2 { get; set; }

        public string? CustomerEmail { get; set; }

        public string? VillageOrStreet { get; set; }

        public bool? VillageDeliver { get; set; }

        public int? OrderCost { get; set; }

        public int? TotalWeight { get; set; }

        public string? Notes { get; set; }

        public OrderStatus? OrderStatus { get; set; }

        public OrderTypeEnum orderType { get; set; }

        public PaymentTypeEnum paymentType { get; set; }

        public int? TotalCost { get; set; }

        public int? ShippingCost { get; set; }

        public DateTime? OrderDate { get; set; }

        public int? Branch_Id { get; set; }


        public int? Shipping_Id { get; set; }

        public string? Merchant_Id { get; set; }

        public string? Representative_Id { get; set; }

        public int? Governate_Id { get; set; }

        public int? City_Id { get; set; }

        public virtual ICollection<ProductOrderDto> ProductOrders { get; set; } = new List<ProductOrderDto>();
    }
}
