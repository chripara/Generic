using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Generic.Persistence.Migrations
{
    public partial class PhoneNumberTokenVerificationCodePropertyAddedToUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhoneNumberTokenVerificationCode",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhoneNumberTokenVerificationCode",
                table: "AspNetUsers");
        }
    }
}
