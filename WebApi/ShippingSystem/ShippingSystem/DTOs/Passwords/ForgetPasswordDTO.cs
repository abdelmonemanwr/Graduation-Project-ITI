using System.ComponentModel.DataAnnotations;

namespace Server.DTOs.Passwords
{
    public class ForgetPasswordDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }
}
