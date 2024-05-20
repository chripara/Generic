import { View, StyleSheet, Text, TextInput } from "react-native";
import { useRef } from "react";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import fontStyles from "../../config/StyleSheets/fontStyles";
import { TextInputWithValidation } from "../../components/TextInputWithValidation";
import IChangePassword from "../../interfaces/Profile/IChangePassword";

export const ChangePasswordScreen = ({ navigation }) => {
    var oldPasswordInvalid = [];
    var newPasswordInvalid = [];
    var confirmNewPasswordInvalid = [];
    const confirmEmailRef = useRef();   
    const confirmNewPasswordRef = useRef();   

    const[errorEmail, setErrorOldPassword]= useState<string[]>();
    const[errorConfirmEmail, setErrorNewPassword]= useState<string[]>();
    const[errorConfirmNewPassword, setErrorConfirmNewPassword]= useState<string[]>();

    const [rawBody, setRawBody] = useState<IChangePassword>(
    {
        oldPassword: 'string',
        newPassword: 'string',
        confirmNewPassword: 'string'
    } as IChangePassword);
    
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
            setErrorOldPassword([                
                "• " + error.response.data
            ]);                
            
            console.log(error);
            console.log(error.message);
            console.log(error.response.data);
        });    
    }

    const handleErrors = () => {
        setErrorOldPassword(emailInvalid);
        var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        
        // !regEmail.test(rawBody.currentEmail) && emailInvalid.push("• Current email is not valid.");  
        oldPasswordInvalid.length > 0 && setErrorOldPassword(oldPasswordInvalid);
        
        if(rawBody.newEmail == rawBody.currentEmail)
        {
            confirmEmailInvalid.push("Current email and confirm email mismatch.");
        }       

        setErrorNewPassword(newPasswordInvalid);
        setErrorConfirmNewPassword(confirmNewPasswordInvalid);
    }

    return(
    <MainScreen backgroundColor={colors.secondary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={fontStyles.text48White}>Change Password</Text>
            </View>
            <View style={styles.viewText}>
                <Text style={fontStyles.text24White}>Old Password:</Text>
                <TextInputWithValidation errors={errorEmail} handleTextValue={(value) => {
                        (value) => {handleContent('currentEmail', value)}
                    }} 
                    onSubmitEditing={() => {findRoomsForDateCapacityRef.current.focus()}}
                    returnKeyType={"next"}
                />
                <Text style={fontStyles.text24White}>New Password:</Text>
                <TextInputWithValidation errors={errorConfirmEmail} handleTextValue={(value) => {
                        (value) => {handleContent('confirmEmail', value)}                        
                    }} 
                    onSubmitEditing={() => {findRoomsForDateCapacityRef.current.focus()}}
                    returnKeyType={"next"}
                    textInputRef={confirmEmailRef}
                />
                <Text style={fontStyles.text24White}>Confirm New Password:</Text>
                <TextInputWithValidation errors={errorConfirmNewPassword} handleTextValue={(value) => {
                        (value) => {handleContent('confirmNewPassword', value)}                        
                    }} 
                    textInputRef={confirmNewPasswordRef}
                />
            </View>
            <EllipseButtonPrimary
                name={"Change Password"}
                onClick={() => {
                    handleErrors();
                    handleAxiosCall();
                    navigation.navigate("Welcome")
                    }
                }
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
