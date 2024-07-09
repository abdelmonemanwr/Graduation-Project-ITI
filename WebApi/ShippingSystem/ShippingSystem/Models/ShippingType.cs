namespace ShippingSystem.Models
{
    public class ShippingType
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public int? AdditionalShippingValue { get; set; }

        public bool? Status { get; set; }

    }
}
