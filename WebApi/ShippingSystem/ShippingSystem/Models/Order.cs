using ShippingSystem.Enumerations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShippingSystem.Models
{
    public class Order
    {

        public int Id { get; set; }

        public string? CustomerName { get; set; }

        public string? CustomerPhone1 { get; set; }

        public string? CustomerPhone2 { get; set; }

        public string? CustomerEmail { get; set; }

        //public string? Governate { get; set; }

        //public string? City { get; set; }

        public string? VillageOrStreet { get; set; }

        public bool? VillageDeliver { get; set; }

        public int? OrderCost { get; set; }

        public int? TotalWeight { get; set;}

        public string? Notes {  get; set; }

        //public string? MerchantMobile {  get; set; }

        //public string? MerchantAddress { get; set; }

        public OrderStatus? OrderStatus { get; set; }

        public int? TotalCost {  get; set; }

        public int? ShippingCost {  get; set; }

        public DateTime? OrderDate {  get; set; }

        //[ForeignKey("OrderType")]
        //public int? OrderType_Id { get; set; }

        //public virtual OrderType? OrderType { get; set; }

        public OrderTypeEnum orderType { get; set; }

        [ForeignKey("Branch")]
        public int? Branch_Id { get; set; }

        public virtual Branch? Branch { get; set; }

        //[ForeignKey("PaymentType")]
        //public int? Payment_Id { get; set; }

        //public virtual PaymentType? PaymentType { get; set; }

        public PaymentTypeEnum paymentType {  get; set; }

        [ForeignKey("ShippingType")]
        public int? Shipping_Id { get; set; }

        public virtual ShippingType? ShippingType { get; set; }

        [ForeignKey("Merchant")]
        public string? Merchant_Id {  get; set; }

        public virtual Merchant Merchant { get; set; }


        [ForeignKey("Representative")]
        public string? Representative_Id { get; set; }

        public virtual Representative Representative { get; set; }

        [ForeignKey("Governate")]
        public int? Governate_Id { get; set; }

        public virtual Governate Governate {  get; set; }

        [ForeignKey("City")]
        public int? City_Id {  get; set; }

        public virtual City City {  get; set; }


        public virtual ICollection<ProductOrder> ProductOrders { get; set; } = new List<ProductOrder>();



    }
}
