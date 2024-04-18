import IHotelRoom from "./IHotelRoom";
import IOffer from "./IOffer";
import IPair from "../General/IPair";

export default interface IHotelPair { 
    numberOfPairs: number,
    pairs: IPair[]
}