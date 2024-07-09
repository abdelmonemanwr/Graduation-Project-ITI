using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShippingSystem.Migrations
{
    /// <inheritdoc />
    public partial class v3yousef : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cities_Governates_Governate_Id",
                table: "Cities");

            migrationBuilder.AlterColumn<int>(
                name: "Governate_Id",
                table: "Cities",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Cities_Governates_Governate_Id",
                table: "Cities",
                column: "Governate_Id",
                principalTable: "Governates",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cities_Governates_Governate_Id",
                table: "Cities");

            migrationBuilder.AlterColumn<int>(
                name: "Governate_Id",
                table: "Cities",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Cities_Governates_Governate_Id",
                table: "Cities",
                column: "Governate_Id",
                principalTable: "Governates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
