
using System.ComponentModel.DataAnnotations;

namespace ShippingSystem.DTOs.Merchant
{
    public class MerchantDTO
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string UserName { get;set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string Governate { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string StoreName { get; set; }
        [Required]
        public int SpecialPickupCost { get; set; }
        [Required]
        public int InCompleteShippingRatio { get; set; }


        [Required]
        public string BranchName { get; set; }
        public List<SpecialPriceDTO> SpecialPrices { get; set; }
    }

    public class MerchantResponseDTO
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public string Governate { get; set; }
        public string City { get; set; }
        public string StoreName { get; set; }
        public int SpecialPickupCost { get; set; }
        public int InCompleteShippingRatio { get; set; }
        public string BranchName { get; set; }

        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public string Password { get; set; }

        public string UserName { get; set; }
        public List<SpecialPriceDTO> SpecialPrices { get; set; }

        [Required]
        public bool isDeleted { get; set; }
    }

    public class SpecialPriceDTO
    {
        public int? TransportCost { get; set; }
        public string Governate { get; set; }
        public string City { get; set; }
    }
}

