import { View, Text, StyleSheet } from "react-native";
import { useState, useRef } from "react";
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
    
    const tokenRef = useRef();
    const emailRef = useRef();
    const passwordsRef = useRef();
    const confirmPasswordsRef = useRef();

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
    
    const handleAxiosCall = () => {
        console.log(rawBody);
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
                const cont = JSON.stringify(error.response.data);
                const jsonCont = JSON.parse(cont)['errors'];             
                jsonCont['Token'] && 
                setErrorToken([
                    ...tokenErrors,
                    "• " + jsonCont['Token'][0]
                ])                
                jsonCont['Email'] && 
                setErrorEmails([
                    ...emailErrors,
                    "• " + jsonCont['Email'][0]
                ])
                jsonCont['Password'] && 
                setErrorPasswords([
                    ...passwordsErrors,
                    "• " + jsonCont['Password'][0]
                ])                
                jsonCont['ConfirmPassword'] && 
                setErrorConfirmPasswordMismatch([
                    ...confirmPasswordsMismatch,
                    "• " + jsonCont['ConfirmPassword'][0]
                ])
            });            
        }
    }

    const handleContent = (key: string, val: string) => {
        setRawBody({
            ...rawBody,
            [key]: val
        });
    }

    const handleErrors = () => {            
        
        setErrorToken(tokenErrors);
        setErrorPasswords(emailErrors);
        setErrorConfirmPasswordMismatch(passwordsErrors);
        setErrorEmails(confirmPasswordsMismatch);

        var reg = {
            'email'           : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
            'capital'         : /[A-Z]/,
            'digit'           : /[0-9]/,
            'lower'           : /[a-z]/,
            'nonAlphanumeric' : /[`!@#$%^&*_+=\-]/
        };

        rawBody.confirmPassword !== rawBody.password && confirmPasswordsMismatch.push("• Password and Confirm Password mismatch.");
        !reg['email'].test(rawBody.email) && emailErrors.push("• Email is not valid.");
        !reg['capital'].test(rawBody.password) && passwordsErrors.push("• Password need a capital letter.");
        !reg['digit'].test(rawBody.password) && passwordsErrors.push("• Password need a digit.");
        !reg['lower'].test(rawBody.password) && passwordsErrors.push("• Password need a lower letter.");
        !reg['nonAlphanumeric'].test(rawBody.password) && passwordsErrors.push("• Password need a non alphanumeric.");
        rawBody.confirmPassword !== rawBody.password && passwordsErrors.push("• Password and Confirm Password mismatch.");

        tokenErrors.length > 0 && setErrorToken(tokenErrors);
        passwordsErrors.length > 0  && setErrorPasswords(passwordsErrors);
        confirmPasswordsMismatch.length > 0 && setErrorConfirmPasswordMismatch(confirmPasswordsMismatch);
        emailErrors.length > 0 && setErrorEmails(emailErrors);
    }

return(
    <MainScreen backgroundColor={colors.secondary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={fontStyles.text48White}>Reset Password</Text>
            </View>
            <View style={styles.viewText}>
                <Text style={fontStyles.text24White}>Token:</Text>
                <TextInputWithValidation 
                    ref={tokenRef}
                    onSubmitEditing={() => {emailRef.current.focus()}}
                    errors={errorsToken} 
                    returnKeyType = {"next"}                    
                    handleTextValue={(value) => {
                        handleContent('token', value);
                    }}
                />
                <Text style={fontStyles.text24White}>Email:</Text>
                <TextInputWithValidation 
                    ref={emailRef}
                    onSubmitEditing={() => {passwordsRef.current.focus()}}
                    errors={errorsEmail}
                    returnKeyType = {"next"}                    
                    handleTextValue={(value) => {
                        handleContent('email', value);
                    }}
                />
                <Text style={fontStyles.text24White}>New Password:</Text>
                <TextInputWithValidation 
                    ref={passwordsRef}
                    onSubmitEditing={() => {confirmPasswordsRef.current.focus()}}
                    errors={errorPasswords}                     
                    returnKeyType = {"next"}
                    handleTextValue={(value) => {
                        handleContent('password', value);
                    }}
                />
                <Text style={fontStyles.text24White}>Confirm New Password:</Text>
                <TextInputWithValidation 
                    ref={confirmPasswordsRef}
                    errors={errorConfirmPasswordMismatch} 
                    handleTextValue={(value) => {
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
                marginTop={"2%"}
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
        marginVertical: "5%",
        paddingHorizontal: "5%",
    }
});