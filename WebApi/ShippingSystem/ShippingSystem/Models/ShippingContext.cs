
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ShippingSystem.Models
{
    public class ShippingContext : IdentityDbContext<ApplicationUser,Group,string> 
    {
        public DbSet<Employee>? Employees { get; set; }

        public DbSet<Merchant>? Merchants { get; set; }

        public DbSet<Representative>? Representatives { get; set; }

        public DbSet<Branch>? Branches { get; set; }

        public DbSet<Privilege>? Privileges { get; set; }

        public DbSet<Order>? Orders { get; set; }

        public DbSet<OrderType>? OrderTypes { get; set; }

        public DbSet<ShippingType>? ShippingTypes { get; set; }

        public DbSet<PaymentType>? PaymentTypes { get; set; }

        public DbSet<ProductOrder>? ProductOrders { get; set; }

        public DbSet<Governate>? Governates {  get; set; }

        public DbSet<City>? Cities { get; set; }

        public DbSet<VillageCost>? VillageCosts { get; set; }

        public DbSet<RepresentativeGovernate>? RepresentativeGovernates { get; set; }

        public DbSet<WeightOption>? WeightOptions { get; set; }

        public DbSet<SpecialPrice>? SpecialPrices { get; set; }


        public ShippingContext(DbContextOptions<ShippingContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<RepresentativeGovernate>().HasKey("Representative_Id", "Governate_Id");

            //builder.Entity<GroupPrivilege>().HasKey("Group_Id", "Privelege_Id");

            builder.Entity<Employee>(entity => { entity.ToTable("Employees"); });

            builder.Entity<Merchant>(entity => { entity.ToTable("Merchants"); });

            builder.Entity<Representative>(entity => { entity.ToTable("Representatives"); });

            base.OnModelCreating(builder);
        }






    }
}
