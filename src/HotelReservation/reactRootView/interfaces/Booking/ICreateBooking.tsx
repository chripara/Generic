export  default interface ICreateBooking {
    room: string
    firstName: string,
    lastName: string,
    description: string,
    startDate: Date,
    endDate: Date,
    hotelRoomId: number
}