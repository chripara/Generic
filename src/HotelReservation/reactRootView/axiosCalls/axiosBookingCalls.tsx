import axios from "axios";
import axiosCalls from "./axiosCalls";
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from "../config/constants";
import IBookingInterface from "../interfaces/Booking/IBooking";
import IUpdateBookingInterface from "../interfaces/Booking/IUpdateBooking";

export default {
    getBookingCall: (id) =>
    {       
        return axios({
            method: 'get',
            url: `${axiosCalls.baseUrl}/Booking/GetBooking?Id=` + id, // ${id},
            headers: {
                'Content-Type': 'application/json',
                //'set-Cookie': authCookie
            }, 
            withCredentials: true
        })
    },   
    deleteBookingCall: (id) =>
    {       
        return axios({
            method: 'delete',
            url: `${axiosCalls.baseUrl}/Booking/DeleteBooking`, // ${id},
            headers: {
                'Content-Type': 'application/json'
            }, 
            data: id,
            withCredentials: true
        })
    },   
    createBookingsCall: ( dto:IBookingInterface ) =>
    {       
        return axios({
            method: 'post',
            url: `${axiosCalls.baseUrl}/Booking/CreateBookings`, // ${id},
            headers: {
                'Content-Type': 'application/json'
            }, 
            data: dto,
            withCredentials: true
        })
    },   
    updateBookingCall: (dto: IUpdateBookingInterface) =>
    {       
        return axios({
            method: 'put',
            url: `${axiosCalls.baseUrl}/Booking/UpdateBooking`, 
            headers: {
                'Content-Type': 'application/json'
            }, 
            data: dto,
            withCredentials: true
        })
    }, 
    getMyBookingsCall: () =>
    {       
        return axios({
            method: 'get',
            url: `${axiosCalls.baseUrl}/Booking/GetMyBookings`, // ${id},
            headers: {
                'Content-Type': 'application/json',
                //'set-Cookie': authCookie
            }, 
            withCredentials: true
        })
    },   
    getAllBookingsForHotelCall: (HotelName : string) =>
    {
        return axios({
            method: 'get',
            url: `${axiosCalls.baseUrl}/Booking/GetAllBookingsForHotel?HotelName=` + HotelName,
            headers: {
                'Content-Type': 'application/json'
            }, 
            withCredentials: true
        })
    },   
    
}