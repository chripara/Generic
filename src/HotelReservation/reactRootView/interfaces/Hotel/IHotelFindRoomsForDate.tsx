export default interface IHotelFindRoomsForDate{
    city: string,
    capacity: string,
    minPricePerDay: number,
    maxPricePerDay: number,
    startDate: Date,
    endDate: Date
}