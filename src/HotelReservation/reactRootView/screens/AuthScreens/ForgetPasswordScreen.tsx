import { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import { EllipseButtonSecondary } from "../../components/EllipseButtonSecondary";
import fontStyles from "../../config/StyleSheets/fontStyles";
import axiosAuthCalls from '../../axiosCalls/axiosAuthCalls';
import IForgotPassword from "../../interfaces/Auth/IForgotPassword";
import { TextInputWithValidation } from "../../components/TextInputWithValidation";

export const ForgetPasswordScreen = ({ navigation }) => {
    
var emailInvalid = [];

const [rawBody, setRawBody] = useState<IForgotPassword>(
{
    email: 'string'
} as IForgotPassword);

const[errorEmail, setErrorEmail]= useState<string[]>();

const [isForgotPasswordCompletedSuccessfully, setIsForgotPasswordCompletedSuccessfully] = useState(false);
 
const handleAxiosCall = () => {
    if(emailInvalid.length === 0)
    {
        var result = axiosAuthCalls.postForgotPasswordCall(rawBody);        

        result.then((response) => {
            console.log(response)
        })
        .catch((error) => {                                                                     
            console.log(error);
            console.log(error.message);
            console.log(error.response.data);
        });
        setIsForgotPasswordCompletedSuccessfully(!isForgotPasswordCompletedSuccessfully);
    }      
}

const handleContent = (key: string, val: string) => {
    setRawBody({
        ...rawBody,
        [key]: val
    });
    //setRawBody(random);
    //console.log("handleContent: ", rawBody);
}

const handleErrors = () => {
    setErrorEmail(emailInvalid);
    var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    !regEmail.test(rawBody.email) && emailInvalid.push("• Email is not valid.");    
}

return(
    <MainScreen backgroundColor={colors.primary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={fontStyles.text48White}>Forgot Password</Text>
            </View>
            {   
                isForgotPasswordCompletedSuccessfully ?
                <View style={{...styles.viewText, marginTop: "30%"}}>
                    <Text style={{...fontStyles.text24White, textAlign: 'center'}}>Please check your</Text>
                    <Text style={{...fontStyles.text24White, textAlign: 'center'}}>email for reset</Text>
                    <Text style={{...fontStyles.text24White, textAlign: 'center'}}>password code.</Text>
                </View>
                :
                <View>
                    <View style={styles.viewText}>
                        <Text style={fontStyles.text24White}>Email:</Text>
                        <TextInputWithValidation errors={errorEmail} handleTextValue={(value) => handleContent('email', value)}
                        keyboardType="email-address"/>                
                    </View>
                    <EllipseButtonSecondary
                        name={"Send email"}
                        onClick={() => {
                            handleErrors();
                            handleAxiosCall();
                        }}
                        marginTop={"10%"}
                    />
                </View>            
            }   
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
