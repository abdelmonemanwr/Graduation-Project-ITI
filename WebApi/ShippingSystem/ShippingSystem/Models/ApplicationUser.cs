using Azure.Identity;
using Microsoft.AspNetCore.Identity;
using ShippingSystem.Models;

namespace ShippingSystem.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? FullName { get; set; }

        public bool IsDeleted { get; set; } = false;
    }
}