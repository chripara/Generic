import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import fontStyles from "../../config/StyleSheets/fontStyles";
import { TextInputWithValidation } from "../../components/TextInputWithValidation";
import IResetPassword from "../../interfaces/Auth/IResetPassword";
import constants from "../../config/constants";
import axiosAuthCalls from '../../axiosCalls/axiosAuthCalls';
// import AsyncStorage from '@react-native-community/async-storage';

export const ResetPasswordScreen = ({ navigation }) => {   
    
    var tokenErrors = [];
    var emailErrors = [];
    var passwordsErrors = [];
    var confirmPasswordsMismatch = [];

    const [rawBody, setRawBody] = useState<IResetPassword>(
    {
        token: 'string',
        email: 'string',
        password: 'string',
        confirmPassword: 'string'
    } as IResetPassword);

    const[errorsToken, setErrorToken]= useState<string[]>();
    const[errorsEmail, setErrorEmails]= useState<string[]>();
    const[errorPasswords, setErrorPasswords]= useState<string[]>();
    const[errorConfirmPasswordMismatch, setErrorConfirmPasswordMismatch]= useState<string[]>();    

    // const[isRegistrationCompletedSuccessfully,setIsRegistrationCompletedSuccessfully] = useState(false);
    
    const handleAxiosCall = () => {
        if(
            tokenErrors.length === 0 &&
            emailErrors.length === 0 &&
            passwordsErrors.length === 0 &&
            confirmPasswordsMismatch.length === 0
        )
        {
            var result = axiosAuthCalls.postResetPasswordCall(rawBody);
            setErrorToken([]);
            setErrorEmails([]);
            setErrorPasswords([]);
            setErrorConfirmPasswordMismatch([]);

            result.then((response) => {            
            })
            .catch((error) => {   
            if(error.response.data.toLowerCase().indexOf('token') > -1)
            {
                setErrorToken([
                    ...tokenErrors,
                    "• " + error.response.data
                ])                
            }
            if(error.response.data.toLowerCase().indexOf('email') > -1)
            {
                setErrorEmails([
                    ...emailErrors,
                    "• " + error.response.data
                ])                
            }            
            if(error.response.data.toLowerCase().indexOf('password') > -1)
            {
                setErrorPasswords([
                    ...passwordsErrors,
                    "• " + error.response.data
                ]);
            }
        });
            //console.log('asdfsdfasdf: ',result.finally);

            // console.log("Username ", errorUserName,
            // "Password ", errorPassword,
            // "ConfirmPassword ", errorConfirmPassword,
            // "Email ", errorEmail,
            // "PhoneNumber ", errorPhoneNumber);
        }
        //setIsRegistrationCompletedSuccessfully(!isRegistrationCompletedSuccessfully);
    }

    const handleContent = (key: string, val: string) => {
        setRawBody({
            ...rawBody,
            [key]: val
        });
    }

    const handleErrors = () => {            
        
        setErrorToken(tokenErrors);
        setErrorPassword(emailErrors);
        setErrorConfirmPassword(passwordsErrors);
        setErrorEmail(confirmPasswordsMismatch);

        var reg = {
            'email'           : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
            'capital'         : /[A-Z]/,
            'digit'           : /[0-9]/,
            'lower'           : /[a-z]/,
            'nonAlphanumeric' : /[`!@#$%^&*_+=\-]/
        };

        rawBody.confirmPassword !== rawBody.password && passwordsMismatch.push("• Password and Confirm Password mismatch.");
        !reg['email'].test(rawBody.email) && emailFormatInvalid.push("• Email is not valid.");
        rawBody.phoneNumber.length < 9 && phoneLengthInvalid.push("• Phone number is short.");
        rawBody.token.length < constants.phoneNumberTokenLength && phoneLengthInvalid.push("• Phone number is short.");
        !reg['capital'].test(rawBody.password) && passwordErrors.push("• Password need a capital letter.");
        !reg['digit'].test(rawBody.password) && passwordErrors.push("• Password need a digit.");
        !reg['lower'].test(rawBody.password) && passwordErrors.push("• Password need a lower letter.");
        !reg['nonAlphanumeric'].test(rawBody.password) && passwordErrors.push("• Password need a non alphanumeric.");
        rawBody.confirmPassword !== rawBody.password && passwordErrors.push("• Password and Confirm Password mismatch.");

        usernameInvalid.length > 0 && setErrorUserName(usernameInvalid);
        passwordErrors.length > 0  && setErrorPassword(passwordErrors);
        passwordsMismatch.length > 0 && setErrorConfirmPassword(passwordsMismatch);
        emailFormatInvalid.length > 0 && setErrorEmail(emailFormatInvalid);
        phoneLengthInvalid.length > 0 && setErrorPhoneNumber(phoneLengthInvalid);    
    }

return(
    <MainScreen backgroundColor={colors.secondary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={fontStyles.text48White}>Change Password</Text>
            </View>
            <View style={styles.viewText}>
                <Text style={fontStyles.text24White}>Token:</Text>
                <TextInputWithValidation errors={errorsToken} handleTextValue={(value) => {
                        handleContent('token', value);
                    }}
                />
                <Text style={fontStyles.text24White}>Old Password:</Text>
                <TextInputWithValidation errors={errorsEmail} handleTextValue={(value) => {
                        handleContent('email', value);
                    }}
                />
                <Text style={fontStyles.text24White}>New Password:</Text>
                <TextInputWithValidation errors={errorPasswords} handleTextValue={(value) => {
                        handleContent('password', value);
                    }}
                />
                <Text style={fontStyles.text24White}>Confirm New Password:</Text>
                <TextInputWithValidation errors={errorConfirmPasswordMismatch} handleTextValue={(value) => {
                        handleContent('confirmPassword', value);
                    }}
                />
            </View>
            <EllipseButtonPrimary
                name={"Change Password"}
                onClick={() => 
                {
                    handleErrors();
                    handleAxiosCall();
                }}
                marginTop={"10%"}
            />
        </View>
    </MainScreen>
)};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "3%",
    },
    viewText: {
        position: "relative",
        marginVertical: "10%",
        paddingHorizontal: "5%",
    }
});