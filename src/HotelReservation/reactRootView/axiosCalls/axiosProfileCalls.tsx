import axios from "axios";
import axiosCalls from "./axiosCalls";
import AsyncStorage from '@react-native-async-storage/async-storage';
import IChangeEmailInterface from "../interfaces/Profile/IChangeEmail";
import IChangePasswordInterface from "../interfaces/Profile/IChangePassword";
// import IVerifyChangedEmailInterface from "../../interfaces/Profile/IVerifyChangedEmailInterface";
import constants from "../config/constants";

export default {
    // IVerifyChangedEmailInterface
    postChangeEmailCall: async (dto: IChangeEmailInterface) =>
    {
        let authCookie = "";
        await AsyncStorage.getItem(constants.AuthCookie).then((value) => {
            authCookie = value;
        });
        axios({
            method: 'post',
            url: `${axiosCalls.baseUrl}/Auth/Register`,
            headers: {
                'Content-Type': 'application/json',
                'Cookie': authCookie
            },
            data: dto
          })          
    },
    postChangePasswordCall: async (dto: IChangePasswordInterface) =>
    {
        let authCookie = "";
        await AsyncStorage.getItem(constants.AuthCookie).then((value) => {
            authCookie = value;
        });
        axios({
            method: 'post',
            url: `${axiosCalls.baseUrl}/Auth/Login`,
            headers: {
                'Content-Type': 'application/json',
                'Cookie': authCookie
            },
            data: dto
        })          
    }
}
