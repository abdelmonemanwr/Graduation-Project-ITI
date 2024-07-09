﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ShippingSystem.Models;

#nullable disable

namespace ShippingSystem.Migrations
{
    [DbContext(typeof(ShippingContext))]
    partial class ShippingContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Proxies:ChangeTracking", false)
                .HasAnnotation("Proxies:CheckEquality", false)
                .HasAnnotation("Proxies:LazyLoading", true)
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("ShippingSystem.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);

                    b.UseTptMappingStrategy();
                });

            modelBuilder.Entity("ShippingSystem.Models.Branch", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("AddingDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("Status")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Branches");
                });

            modelBuilder.Entity("ShippingSystem.Models.City", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("Governate_Id")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("NormalCost")
                        .HasColumnType("int");

                    b.Property<int?>("PickUpCost")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Governate_Id");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("ShippingSystem.Models.Governate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("Status")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Governates");
                });

            modelBuilder.Entity("ShippingSystem.Models.Group", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DateAdded")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("ShippingSystem.Models.GroupPrivilege", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool?>("Add")
                        .HasColumnType("bit");

                    b.Property<bool?>("Delete")
                        .HasColumnType("bit");

                    b.Property<string>("Group_Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int?>("Privelege_Id")
                        .HasColumnType("int");

                    b.Property<bool?>("Update")
                        .HasColumnType("bit");

                    b.Property<bool?>("View")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("Group_Id");

                    b.HasIndex("Privelege_Id");

                    b.ToTable("GroupPrivilege");
                });

            modelBuilder.Entity("ShippingSystem.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("Branch_Id")
                        .HasColumnType("int");

                    b.Property<int?>("City_Id")
                        .HasColumnType("int");

                    b.Property<string>("CustomerEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerPhone1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerPhone2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Governate_Id")
                        .HasColumnType("int");

                    b.Property<string>("Merchant_Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Notes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("OrderCost")
                        .HasColumnType("int");

                    b.Property<DateTime?>("OrderDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("OrderStatus")
                        .HasColumnType("int");

                    b.Property<int?>("OrderType_Id")
                        .HasColumnType("int");

                    b.Property<int?>("Payment_Id")
                        .HasColumnType("int");

                    b.Property<string>("Representative_Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int?>("ShippingCost")
                        .HasColumnType("int");

                    b.Property<int?>("Shipping_Id")
                        .HasColumnType("int");

                    b.Property<int?>("TotalCost")
                        .HasColumnType("int");

                    b.Property<int?>("TotalWeight")
                        .HasColumnType("int");

                    b.Property<bool?>("VillageDeliver")
                        .HasColumnType("bit");

                    b.Property<string>("VillageOrStreet")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("orderType")
                        .HasColumnType("int");

                    b.Property<int>("paymentType")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Branch_Id");

                    b.HasIndex("City_Id");

                    b.HasIndex("Governate_Id");

                    b.HasIndex("Merchant_Id");

                    b.HasIndex("OrderType_Id");

                    b.HasIndex("Payment_Id");

                    b.HasIndex("Representative_Id");

                    b.HasIndex("Shipping_Id");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("ShippingSystem.Models.OrderType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("OrderTypes");
                });

            modelBuilder.Entity("ShippingSystem.Models.PaymentType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("PaymentTypes");
                });

            modelBuilder.Entity("ShippingSystem.Models.Privilege", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int?>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Privileges");
                });

            modelBuilder.Entity("ShippingSystem.Models.ProductOrder", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Order_Id")
                        .HasColumnType("int");

                    b.Property<int?>("Quantity")
                        .HasColumnType("int");

                    b.Property<int?>("UnitPrice")
                        .HasColumnType("int");

                    b.Property<int?>("UnitWeight")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Order_Id");

                    b.ToTable("ProductOrders");
                });

            modelBuilder.Entity("ShippingSystem.Models.RepresentativeGovernate", b =>
                {
                    b.Property<string>("Representative_Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("Governate_Id")
                        .HasColumnType("int");

                    b.HasKey("Representative_Id", "Governate_Id");

                    b.HasIndex("Governate_Id");

                    b.ToTable("RepresentativeGovernates");
                });

            modelBuilder.Entity("ShippingSystem.Models.ShippingType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AdditionalShippingValue")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("Status")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("ShippingTypes");
                });

            modelBuilder.Entity("ShippingSystem.Models.SpecialPrice", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("City_Id")
                        .HasColumnType("int");

                    b.Property<int?>("Governate_Id")
                        .HasColumnType("int");

                    b.Property<string>("Merchant_Id")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<int?>("TransportCost")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("City_Id");

                    b.HasIndex("Governate_Id");

                    b.HasIndex("Merchant_Id");

                    b.ToTable("SpecialPrices");
                });

            modelBuilder.Entity("ShippingSystem.Models.VillageCost", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("Price")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("VillageCosts");
                });

            modelBuilder.Entity("ShippingSystem.Models.WeightOption", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AdditionalKgPrice")
                        .HasColumnType("int");

                    b.Property<int?>("MaximumWeight")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("WeightOptions");
                });

            modelBuilder.Entity("ShippingSystem.Models.Employee", b =>
                {
                    b.HasBaseType("ShippingSystem.Models.ApplicationUser");

                    b.Property<int?>("Branch_Id")
                        .HasColumnType("int");

                    b.Property<bool?>("Status")
                        .HasColumnType("bit");

                    b.HasIndex("Branch_Id");

                    b.ToTable("Employees", (string)null);
                });

            modelBuilder.Entity("ShippingSystem.Models.Merchant", b =>
                {
                    b.HasBaseType("ShippingSystem.Models.ApplicationUser");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Branch_Id")
                        .HasColumnType("int");

                    b.Property<int?>("City_Id")
                        .HasColumnType("int");

                    b.Property<int?>("Governate_Id")
                        .HasColumnType("int");

                    b.Property<float?>("InCompleteShippingRatio")
                        .HasColumnType("real");

                    b.Property<int?>("SpecialPickupCost")
                        .HasColumnType("int");

                    b.Property<string>("StoreName")
                        .HasColumnType("nvarchar(max)");

                    b.HasIndex("Branch_Id");

                    b.HasIndex("City_Id");

                    b.HasIndex("Governate_Id");

                    b.ToTable("Merchants", (string)null);
                });

            modelBuilder.Entity("ShippingSystem.Models.Representative", b =>
                {
                    b.HasBaseType("ShippingSystem.Models.ApplicationUser");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Branch_Id")
                        .HasColumnType("int");

                    b.Property<float?>("CompanyOrderPrecentage")
                        .HasColumnType("real");

                    b.Property<float?>("SalePrecentage")
                        .HasColumnType("real");

                    b.Property<int>("SaleType")
                        .HasColumnType("int");

                    b.HasIndex("Branch_Id");

                    b.ToTable("Representatives", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("ShippingSystem.Models.Group", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("ShippingSystem.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("ShippingSystem.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("ShippingSystem.Models.Group", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ShippingSystem.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("ShippingSystem.Models.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ShippingSystem.Models.City", b =>
                {
                    b.HasOne("ShippingSystem.Models.Governate", "Governate")
                        .WithMany("Cities")
                        .HasForeignKey("Governate_Id");

                    b.Navigation("Governate");
                });

            modelBuilder.Entity("ShippingSystem.Models.GroupPrivilege", b =>
                {
                    b.HasOne("ShippingSystem.Models.Group", "Group")
                        .WithMany("Privileges")
                        .HasForeignKey("Group_Id");

                    b.HasOne("ShippingSystem.Models.Privilege", "Privilege")
                        .WithMany("Privileges")
                        .HasForeignKey("Privelege_Id");

                    b.Navigation("Group");

                    b.Navigation("Privilege");
                });

            modelBuilder.Entity("ShippingSystem.Models.Order", b =>
                {
                    b.HasOne("ShippingSystem.Models.Branch", "Branch")
                        .WithMany()
                        .HasForeignKey("Branch_Id");

                    b.HasOne("ShippingSystem.Models.City", "City")
                        .WithMany()
                        .HasForeignKey("City_Id");

                    b.HasOne("ShippingSystem.Models.Governate", "Governate")
                        .WithMany()
                        .HasForeignKey("Governate_Id");

                    b.HasOne("ShippingSystem.Models.Merchant", "Merchant")
                        .WithMany()
                        .HasForeignKey("Merchant_Id");

                    b.HasOne("ShippingSystem.Models.OrderType", "OrderType")
                        .WithMany()
                        .HasForeignKey("OrderType_Id");

                    b.HasOne("ShippingSystem.Models.PaymentType", "PaymentType")
                        .WithMany()
                        .HasForeignKey("Payment_Id");

                    b.HasOne("ShippingSystem.Models.Representative", "Representative")
                        .WithMany()
                        .HasForeignKey("Representative_Id");

                    b.HasOne("ShippingSystem.Models.ShippingType", "ShippingType")
                        .WithMany()
                        .HasForeignKey("Shipping_Id");

                    b.Navigation("Branch");

                    b.Navigation("City");

                    b.Navigation("Governate");

                    b.Navigation("Merchant");

                    b.Navigation("OrderType");

                    b.Navigation("PaymentType");

                    b.Navigation("Representative");

                    b.Navigation("ShippingType");
                });

            modelBuilder.Entity("ShippingSystem.Models.ProductOrder", b =>
                {
                    b.HasOne("ShippingSystem.Models.Order", "Order")
                        .WithMany("ProductOrders")
                        .HasForeignKey("Order_Id");

                    b.Navigation("Order");
                });

            modelBuilder.Entity("ShippingSystem.Models.RepresentativeGovernate", b =>
                {
                    b.HasOne("ShippingSystem.Models.Governate", "Governate")
                        .WithMany("RepresentativeGovernates")
                        .HasForeignKey("Governate_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ShippingSystem.Models.Representative", "Representative")
                        .WithMany("RepresentativeGovernates")
                        .HasForeignKey("Representative_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Governate");

                    b.Navigation("Representative");
                });

            modelBuilder.Entity("ShippingSystem.Models.SpecialPrice", b =>
                {
                    b.HasOne("ShippingSystem.Models.City", "City")
                        .WithMany()
                        .HasForeignKey("City_Id");

                    b.HasOne("ShippingSystem.Models.Governate", "Governate")
                        .WithMany()
                        .HasForeignKey("Governate_Id");

                    b.HasOne("ShippingSystem.Models.Merchant", "Merchant")
                        .WithMany("SpecialPrices")
                        .HasForeignKey("Merchant_Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("City");

                    b.Navigation("Governate");

                    b.Navigation("Merchant");
                });

            modelBuilder.Entity("ShippingSystem.Models.Employee", b =>
                {
                    b.HasOne("ShippingSystem.Models.Branch", "Branch")
                        .WithMany("Employees")
                        .HasForeignKey("Branch_Id");

                    b.HasOne("ShippingSystem.Models.ApplicationUser", null)
                        .WithOne()
                        .HasForeignKey("ShippingSystem.Models.Employee", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Branch");
                });

            modelBuilder.Entity("ShippingSystem.Models.Merchant", b =>
                {
                    b.HasOne("ShippingSystem.Models.Branch", "Branch")
                        .WithMany("Merchants")
                        .HasForeignKey("Branch_Id");

                    b.HasOne("ShippingSystem.Models.City", "City")
                        .WithMany()
                        .HasForeignKey("City_Id");

                    b.HasOne("ShippingSystem.Models.Governate", "Governate")
                        .WithMany()
                        .HasForeignKey("Governate_Id");

                    b.HasOne("ShippingSystem.Models.ApplicationUser", null)
                        .WithOne()
                        .HasForeignKey("ShippingSystem.Models.Merchant", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Branch");

                    b.Navigation("City");

                    b.Navigation("Governate");
                });

            modelBuilder.Entity("ShippingSystem.Models.Representative", b =>
                {
                    b.HasOne("ShippingSystem.Models.Branch", "Branch")
                        .WithMany("Representatives")
                        .HasForeignKey("Branch_Id");

                    b.HasOne("ShippingSystem.Models.ApplicationUser", null)
                        .WithOne()
                        .HasForeignKey("ShippingSystem.Models.Representative", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Branch");
                });

            modelBuilder.Entity("ShippingSystem.Models.Branch", b =>
                {
                    b.Navigation("Employees");

                    b.Navigation("Merchants");

                    b.Navigation("Representatives");
                });

            modelBuilder.Entity("ShippingSystem.Models.Governate", b =>
                {
                    b.Navigation("Cities");

                    b.Navigation("RepresentativeGovernates");
                });

            modelBuilder.Entity("ShippingSystem.Models.Group", b =>
                {
                    b.Navigation("Privileges");
                });

            modelBuilder.Entity("ShippingSystem.Models.Order", b =>
                {
                    b.Navigation("ProductOrders");
                });

            modelBuilder.Entity("ShippingSystem.Models.Privilege", b =>
                {
                    b.Navigation("Privileges");
                });

            modelBuilder.Entity("ShippingSystem.Models.Merchant", b =>
                {
                    b.Navigation("SpecialPrices");
                });

            modelBuilder.Entity("ShippingSystem.Models.Representative", b =>
                {
                    b.Navigation("RepresentativeGovernates");
                });
#pragma warning restore 612, 618
        }
    }
}
