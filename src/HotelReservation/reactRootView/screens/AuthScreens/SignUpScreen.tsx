import { View, StyleSheet, Text, TextInput } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import axiosAuthCalls from '../../axiosCalls/axiosAuthCalls';
import { EllipseButtonSecondary } from "../../components/EllipseButtonSecondary";
import { useState } from "react";
import fontStyles from "../../config/StyleSheets/fontStyles";
import ISignUp from "../../interfaces/Auth/ISignUp";
import { TextInputWithValidation } from "../../components/TextInputWithValidation";

export const SignUpScreen = ({ navigation }) => {
    
var usernameInvalid = [];
var passwordErrors = [];
var passwordsMismatch = [];
var emailFormatInvalid = [];
var phoneLengthInvalid = [];

const [rawBody, setRawBody] = useState<ISignUp>(
    {
        userName: 'string',
        password: 'string',
        confirmPassword: 'string',
        email: 'string',
        phoneNumber: 'string',
        firstName: 'string',
        lastName: 'string',
        location: 'string'
    } as ISignUp);

const[errorUserName, setErrorUserName]= useState<string[]>();
const[errorPassword, setErrorPassword]= useState<string[]>();
const[errorConfirmPassword, setErrorConfirmPassword]= useState<string[]>();
const[errorEmail, setErrorEmail]= useState<string[]>();
const[errorPhoneNumber, setErrorPhoneNumber]= useState<string[]>();

const [isRegistrationCompletedSuccessfully,setIsRegistrationCompletedSuccessfully] = useState(false);

const handleAxiosCall = () => {

    if(usernameInvalid.length === 0 &&
        passwordErrors.length === 0 &&
        passwordsMismatch.length === 0 &&
        emailFormatInvalid.length === 0 &&
        phoneLengthInvalid.length === 0)
    {
        var result = axiosAuthCalls.postSignUpCall(rawBody);
        setErrorUserName([]);
        setErrorPassword([]);
        setErrorConfirmPassword([]);
        setErrorEmail([]);
        setErrorPhoneNumber([]);

        result
        .catch((error) => {                        
            if(error.response.data.toLowerCase().indexOf('username') > -1)
            {
                setErrorUserName([
                    ...usernameInvalid,
                    "• " + error.response.data
                ])                
            }
            if(error.response.data.toLowerCase().indexOf('password') > -1)
            {
                setErrorPassword([
                    ...passwordErrors,
                    "• " + error.response.data
                ]);
            }
            if(error.response.data.toLowerCase().indexOf('email') > -1)
            {
                setErrorEmail([
                    ...emailFormatInvalid,
                    "• " + error.response.data
                ])                
            }
            if(error.response.data.toLowerCase().indexOf('phone') > -1)
            {
                setErrorPhoneNumber([
                    ...phoneLengthInvalid,
                    "• " + error.response.data
                ])                
            }
        });
    }
    setIsRegistrationCompletedSuccessfully(!isRegistrationCompletedSuccessfully);
}

const handleContent = (key: string, val: string) => {
    setRawBody({
        ...rawBody,
        [key]: val
    });
}

const handleErrors = () => {    
    
    setErrorUserName(usernameInvalid);
    setErrorPassword(passwordErrors);
    setErrorConfirmPassword(passwordsMismatch);
    setErrorEmail(emailFormatInvalid);
    setErrorPhoneNumber(phoneLengthInvalid);

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

    setIsRegistrationCompletedSuccessfully(!isRegistrationCompletedSuccessfully);
}

return(
    <MainScreen backgroundColor={colors.primary}>
        {
            isRegistrationCompletedSuccessfully 
            ? 
            <View>
                <View style={styles.viewText}>
                    <Text style={fontStyles.text48White}>Please Verify your email.</Text>
                    <EllipseButtonSecondary
                    name={"Auth Screen"}
                    onClick={() => (                        
                        navigation.navigate("Auth"))}
                    marginTop={50}
                />
                </View>
            </View>
            :
            <View style={styles.container}>
                <View style={styles.viewText}>
                    <Text style={fontStyles.text48White}>Sign Up</Text>
                </View>
                <View style={styles.viewText}>
                    <Text style={fontStyles.text24White}>Username:</Text>
                    <TextInputWithValidation errors={errorUserName}
                        handleTextValue={(value) => handleContent('userName', value)} />
                    <Text style={fontStyles.text24White}>Password:</Text>
                    <TextInputWithValidation  errors={errorPassword}                        
                        handleTextValue={(value) => handleContent('password', value)}
                        secureTextEntry={true}/>
                    <Text style={fontStyles.text24White}>Confirm Password:</Text>
                    <TextInputWithValidation errors={errorConfirmPassword} 
                        handleTextValue={(value) => handleContent('confirmPassword', value)}
                        secureTextEntry={true}/>
                    <Text style={fontStyles.text24White}>Email:</Text>
                    <TextInputWithValidation errors={errorEmail} 
                        handleTextValue={(value) => handleContent('email', value)}
                        keyboardType="email-address"/>
                    <Text style={fontStyles.text24White}>PhoneNumber:</Text>
                    <TextInputWithValidation errors={errorPhoneNumber} 
                        handleTextValue={(value) => handleContent('phoneNumber', value)}
                        keyboardType="phone-pad"/>
                    <Text style={fontStyles.text24White}>FirstName:</Text>
                    <TextInput style={fontStyles.textInput} onChangeText={(value) => handleContent('firstName', value)}/>
                    <Text style={fontStyles.text24White}>LastName:</Text>
                    <TextInput style={fontStyles.textInput} onChangeText={(value) => handleContent('lastName', value)}/>
                    <Text style={fontStyles.text24White}>Locations:</Text>
                    <TextInput style={fontStyles.textInput} onChangeText={(value) => handleContent('location', value)} keyboardType="email-address"/>                
                </View>
                <EllipseButtonSecondary
                    name={"Sign Up"}
                    onClick={() => {
                        handleErrors();
                        handleAxiosCall();
                    }}
                    marginTop={0}
                />
            </View>
        }
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
