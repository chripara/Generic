import axios from "axios";
import axiosCalls from "./axiosCalls";
import IHotelFindAvailableRoomsForHotelInterface from "../interfaces/Hotel/IHotelFindAvailableRoomsForHotel";
import IHotelFindInterface from "../interfaces/Hotel/IHotelFindRoomsForDate";

export default {
    getAllHotelsCall: () =>
    {       
        return axios({
            method: 'get',
            url: `${axiosCalls.baseUrl}/Hotel/GetAllHotels`,
            headers: {
                'Content-Type': 'application/json'
            }, 
            withCredentials: true
        })
    },
    postFindAvailableRoomsForHotel: (dto: IHotelFindAvailableRoomsForHotelInterface) =>
    {       
        return axios({
            method: 'Post',
            url: `${axiosCalls.baseUrl}/Hotel/FindAvailableRoomsForHotel`,
            headers: {
                'Content-Type': 'application/json'
            }, 
            data: dto,
            withCredentials: true
        })
    },
    postFindRoomsForDate: (dto: IHotelFindInterface) =>
    {       
        return axios({
            method: 'Post',
            url: `${axiosCalls.baseUrl}/Hotel/FindRoomsForDate`,
            headers: {
                'Content-Type': 'application/json'
            }, 
            data: dto,
            withCredentials: true
        })
    },
                
} 