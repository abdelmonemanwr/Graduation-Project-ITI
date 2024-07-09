using System.ComponentModel.DataAnnotations.Schema;

namespace ShippingSystem.DTOS.City
{
    public class CityDto
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public int? NormalCost { get; set; }

        public int? PickUpCost { get; set; }

        public int? Governate_Id { get; set; }

    }
}
