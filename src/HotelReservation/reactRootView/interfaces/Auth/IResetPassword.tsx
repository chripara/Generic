export default interface IResetPassword {    
    token: string;
    email: string;
    password: string;
    confirmPassword: string;
}