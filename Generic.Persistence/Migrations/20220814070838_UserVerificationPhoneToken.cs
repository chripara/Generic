using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Generic.Persistence.Migrations
{
    public partial class UserVerificationPhoneToken : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPhoneConfirmed",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "VerifyPhoneToken",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPhoneConfirmed",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "VerifyPhoneToken",
                table: "AspNetUsers");
        }
    }
}
