namespace ShippingSystem.DTOs.Authentication
{
    public class AuthResponseDTO
    {
        public bool isSuccess { get; set; }
        public string? Message { get; set; }
        public string? Token { get; set; } = string.Empty;
        public string? Role { get; set; } = string.Empty;
    }
}
