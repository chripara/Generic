import { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import fontStyles from "../../config/StyleSheets/fontStyles";
import IChangeEmail from "../../interfaces/Profile/IChangeEmail";
import axiospProfileCalls from "../../axiosCalls/axiosProfileCalls";

export const ChangeEmailScreen = ({ navigation }) => {
    
    var emailInvalid = [];
    var confirmEmailInvalid = [];

    const[errorEmail, setErrorEmail]= useState<string[]>();
    const[errorConfirmEmail, setErrorConfirmEmail]= useState<string[]>();

    const [rawBody, setRawBody] = useState<IChangeEmail>(
    {
        currentEmail: 'string',
        newEmail: 'string'
    } as IChangeEmail);
    
    const handleContent = (key: string, val: string) => {
        setRawBody({
            ...rawBody,
            [key]: val
        });
    }
    
    const handleAxiosCall = () => {        
        var result = axiospProfileCalls.postSignInCall(rawBody);        

        result.then((response) => {                      
            console.log(response)

        })
        .catch((error) => {
            setErrorEmail([
                
                "• " + error.response.data
            ]);                
            
            console.log(error);
            console.log(error.message);
            console.log(error.response.data);
        });    
    }

    const handleErrors = () => {
        setErrorEmail(emailInvalid);
        var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        
        !regEmail.test(rawBody.currentEmail) && emailInvalid.push("• Current email is not valid.");  
        emailInvalid.length > 0 && setErrorEmail(emailInvalid);
        
        if(rawBody.newEmail == rawBody.currentEmail)
        {
            confirmEmailInvalid.push("Current email and confirm email mismatch.");
        }       

        setErrorConfirmEmail(confirmEmailInvalid);
    }

    return(
    <MainScreen backgroundColor={colors.secondary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={fontStyles.text48White}>Change Email</Text>
            </View>
            <View style={styles.viewText}>
                <Text style={fontStyles.text24White}>Current Email:</Text>
                <TextInputWithValidation style={fontStyles.textInput} errors={errorEmail}  
                    handleTextValue={(value) => {handleContent('currentEmail', value)}} />
                <Text style={fontStyles.text24White}>New Email:</Text>
                <TextInputWithValidation style={fontStyles.textInput} errors={errorConfirmEmail}  
                    handleTextValue={(value) => {handleContent('confirmEmail', value)}} />
            </View>
            <EllipseButtonPrimary
                name={"Change Email"}
                onClick={() =>
                {
                    handleErrors();
                    handleAxiosCall();
                }}
                marginTop={"30%"}
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
    },
});
