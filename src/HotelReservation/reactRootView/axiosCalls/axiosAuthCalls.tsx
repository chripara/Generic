import axios from "axios";
import axiosCalls from "./axiosCalls";
import ISignUpInterface from "../interfaces/Auth/ISignUp";
import ISignInInterface from "../interfaces/Auth/ISignIn";
import IForgotPassword from "../interfaces/Auth/IForgotPassword";
import IVerifyPhoneNumberInterface from "../interfaces/Auth/IVerifyPhoneNumber";
import IResetPasswordInterface from "../interfaces/Auth/IResetPassword";
import IEditProfile from "../interfaces/Auth/IEditProfile";

export default  {    
    postSignUpCall: (dto: ISignUpInterface) =>
    (
        axios({
            method: 'post',
            url: `${axiosCalls.baseUrl}/Auth/Register`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: dto
          })          
    ),
    postSignInCallAsync: async (dto: ISignInInterface) =>
    (
        axios({
            method: 'post',
            url: `${axiosCalls.baseUrl}/Auth/Login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: dto
          })          
    ),
    postSignInCall: (dto: ISignInInterface) =>
    (
        axios({
            method: 'post',
            url: `${axiosCalls.baseUrl}/Auth/Login`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: dto
          })          
    ),    
    postForgotPasswordCall: (dto: IForgotPassword) =>
    (
        axios({
            method: 'post',
            url: `${axiosCalls.baseUrl}/Auth/ForgotPassword`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: dto
          })          
    ),    
    postVerifyPhoneNumberCall: (dto: IVerifyPhoneNumberInterface) =>
    (
        axios({
            method: 'post',
            url: `${axiosCalls.baseUrl}/Auth/VerifyPhoneNumber`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: dto
          })          
    ),
    postResetPasswordCall: (dto: IResetPasswordInterface) =>
    (
        axios({
            method: 'post',
            url: `${axiosCalls.baseUrl}/Auth/ResetPassword`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: dto
          })          
    ),
    getLogoutCall: () => 
    (
        axios({
            method: 'get',
            url: `${axiosCalls.baseUrl}/Auth/Logout`,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    ),
    postEditProfileCall: (dto: IEditProfile) => 
    (
        axios({
            method: 'post',
            url: `${axiosCalls.baseUrl}/Auth/EditProfile`,
            headers: {
                'Content-Type': 'application/json',
            }, 
            data: dto,
            withCredentials: true
        })
    )
}
