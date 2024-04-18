import React from "react";
import { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import { EllipseButtonSecondary } from "../../components/EllipseButtonSecondary";
import fontStyles from "../../config/StyleSheets/fontStyles";
import IVerifyPhoneNumber from "../../interfaces/Auth/IVerifyPhoneNumber";
import axiosAuthCalls from '../../axiosCalls/axiosAuthCalls';
import { TextInputWithValidation } from "../../components/TextInputWithValidation";
import constants from "../../config/constants";

export const VerifyPhoneNumberScreen = ({ navigation }) => {    
    var tokenLengthInvalid = [];
    var phoneLengthInvalid = [];
    var emailInvalid = [];
    
    const [rawBody, setRawBody] = useState<IVerifyPhoneNumber>(
    {
        token: 'string',
        email: 'string',
        phoneNumber: 'string'
    } as IVerifyPhoneNumber);
    
    const[errorToken, setErrorToken]= useState<string[]>();
    const[errorEmail, setErrorEmail]= useState<string[]>();
    const[errorPhoneNumber, setErrorPhoneNumber]= useState<string[]>();
    
    const handleAxiosCall = () => {
        if(emailInvalid.length === 0 &&
            phoneLengthInvalid.length === 0)
        {
            setErrorPhoneNumber([]);
            setErrorToken([]);
            setErrorEmail([]);
            var result = axiosAuthCalls.postVerifyPhoneNumberCall(rawBody);        
    
            result.then((response) => {
                console.log(response)
            })
            .catch((error) => {                 
                setErrorToken([
                        "• " + error.response.data
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
        setErrorEmail(emailInvalid);
        var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        !regEmail.test(rawBody.email) && emailInvalid.push("• Email is not valid.");    
        
        emailInvalid.length > 0 && setErrorEmail(emailInvalid);

        if(rawBody.token.length < constants.phoneNumberTokenLength)
        {
            tokenLengthInvalid.push(`Token too small. Needs to be ${constants.phoneLengthInvalid} length.`);
            setErrorToken(tokenLengthInvalid);
        }
    }

//TODO: Should be added by default from frontend and not given by user.
    
return(
    <MainScreen backgroundColor={colors.primary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={fontStyles.text48White}>Verify Phone</Text>
                <Text style={fontStyles.text48White}>Number</Text>
            </View>
            <View style={styles.viewText}>
                <Text style={fontStyles.text24White}>Code:</Text>
                <TextInputWithValidation style={fontStyles.text24White}
                    errors={errorToken}
                    handleTextValue={(value) => {handleContent('token', value)}}
                />
                <Text style={fontStyles.text24White}>Email:</Text>
                <TextInputWithValidation style={fontStyles.textInput} 
                    errors={errorEmail}
                    handleTextValue={(value) => {handleContent('email', value)}}
                />
                <Text style={fontStyles.text24White}>Phone Number:</Text>
                <TextInputWithValidation 
                    errors={errorPhoneNumber} 
                    handleTextValue={(value) => {handleContent('phoneNumber', value)}} 
                />
            </View>
            <EllipseButtonSecondary
                name={"Verify Phone"}
                onClick={() =>{
                    handleErrors();
                    handleAxiosCall();
                    navigation.navigate("Welcome")
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
