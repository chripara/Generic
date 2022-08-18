using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Generic.Persistence.Migrations
{
    public partial class BookingHotelRoomManyToOneCreated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HotelRoomId",
                table: "Booking",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Booking_HotelRoomId",
                table: "Booking",
                column: "HotelRoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Booking_HotelRooms_HotelRoomId",
                table: "Booking",
                column: "HotelRoomId",
                principalTable: "HotelRooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Booking_HotelRooms_HotelRoomId",
                table: "Booking");

            migrationBuilder.DropIndex(
                name: "IX_Booking_HotelRoomId",
                table: "Booking");

            migrationBuilder.DropColumn(
                name: "HotelRoomId",
                table: "Booking");
        }
    }
}
