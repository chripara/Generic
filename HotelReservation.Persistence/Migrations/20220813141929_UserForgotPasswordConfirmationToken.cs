using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelReservation.Persistence.Migrations
{
    public partial class UserForgotPasswordConfirmationToken : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ForgotPasswordConfirmationToken",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ForgotPasswordConfirmationToken",
                table: "AspNetUsers");
        }
    }
}
