import IHotelRoom from "./IHotelRoom";
import IOffer from "./IOffer";

export default interface IHotel { 
    Id: number,
    Name: string,
    City: string, 
    Address: string,
    PostCode: string,  
    PhoneNumber: string,  
    Rate: string,  
    Type: string,  
    Description: string,  
    HotelRooms: IHotelRoom[],
    Offers: IOffer[]
}