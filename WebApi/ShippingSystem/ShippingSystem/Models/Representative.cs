﻿using Microsoft.AspNetCore.Identity;
using ShippingSystem.Enumerations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShippingSystem.Models
{
    public class Representative : ApplicationUser
    {

        public string? Address { get; set; }

        public float? CompanyOrderPrecentage { get; set; }

        public float? SalePrecentage { get; set; }

        public SaleType SaleType { get; set; }
        
        [ForeignKey("Branch")]
        public int? Branch_Id { get; set; }

        public virtual Branch? Branch { get; set; }

        public virtual ICollection<RepresentativeGovernate>? RepresentativeGovernates { get; set; } = new List<RepresentativeGovernate>();

    }
}
