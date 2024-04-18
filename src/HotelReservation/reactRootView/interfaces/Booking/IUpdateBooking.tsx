export  default interface IUpdateBooking {
    id: string,
    room: string
    firstName: string,
    lastName: string,
    description: string,
    startDate: Date,
    endDate: Date,
    user: []
}