using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShippingSystem.Migrations
{
    /// <inheritdoc />
    public partial class yousefv7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_OrderTypes_OrderType_Id",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_PaymentTypes_Payment_Id",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_OrderType_Id",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_Payment_Id",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderType_Id",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Payment_Id",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "SaleType",
                table: "Representatives",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "orderType",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "paymentType",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SaleType",
                table: "Representatives");

            migrationBuilder.DropColumn(
                name: "orderType",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "paymentType",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "OrderType_Id",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Payment_Id",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsDeleted",
                table: "AspNetUsers",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_OrderType_Id",
                table: "Orders",
                column: "OrderType_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_Payment_Id",
                table: "Orders",
                column: "Payment_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_OrderTypes_OrderType_Id",
                table: "Orders",
                column: "OrderType_Id",
                principalTable: "OrderTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_PaymentTypes_Payment_Id",
                table: "Orders",
                column: "Payment_Id",
                principalTable: "PaymentTypes",
                principalColumn: "Id");
        }
    }
}
