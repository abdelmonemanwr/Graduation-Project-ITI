using System.ComponentModel.DataAnnotations;

namespace ShippingSystem.DTOs.Authentication
{
    public class RegisterDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [DataType("DataType.Password")]
        public string Password { get; set; } = string.Empty;

        [Required]
        [Compare("Password")]
        [DataType("DataType.Password")]
        public string ConfirmPassword { get; set; } = string.Empty;

        [Required]
        public string FullName { get; set; } = string.Empty;

        [Required]
        public string? PhoneNumber { get; set; }
    }
}