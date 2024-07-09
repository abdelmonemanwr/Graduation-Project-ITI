﻿namespace ShippingSystem.DTOs.Authentication
{
    public class UserDetailsDTO
    {
        public string? Id { get; set; }
        public string? Email { get; set; }
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public List<string>? Roles { get; set; }
        public int? AccessFailedCount { get; set; }
        public bool? TwoFactorEnabled { get; set; }
        public bool? PhoneNumberConfirmed { get; set; }
    }
}
