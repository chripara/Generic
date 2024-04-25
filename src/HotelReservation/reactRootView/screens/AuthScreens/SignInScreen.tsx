import { View, StyleSheet, Text, TextInput } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import { EllipseButtonSecondary } from "../../components/EllipseButtonSecondary";
import fontStyles from "../../config/StyleSheets/fontStyles";
import { useState } from "react";
import axiosAuthCalls from '../../axiosCalls/axiosAuthCalls';
import ISignIn from "../../interfaces/Auth/ISignIn";
import { TextInputWithValidation } from "../../components/TextInputWithValidation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from "../../config/constants";

export const SignInScreen = ({ navigation }) => {

const [rawBody, setRawBody] = useState<ISignIn>(
{
    userName: 'string',
    password: 'string'
} as ISignIn);

const [errorSignIn, setErrorSignIn]= useState<string[]>();
const [cookie, setCookie]=useState<string>();

const [isSignInCompletedSuccessfully, setIsSignInCompletedSuccessfully] = useState(false);
    
const handleAxiosCall = async () => {
    setErrorSignIn([]);
    var result = axiosAuthCalls.postSignInCallAsync(rawBody);        
    
    await result.then((response) => {   
    })
    .catch((error) => {          
        setErrorSignIn([             
            "• Username or password not much plz try again."
        ]);                
        
        console.log('Error ',error);
        console.log('Error message ',error.message);
    });

    setIsSignInCompletedSuccessfully(!isSignInCompletedSuccessfully); 
    
}

const handleContent = (key: string, val: string) => {
    setRawBody({
        ...rawBody,
        [key]: val
    });
}

return (
    <MainScreen backgroundColor={colors.primary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={fontStyles.text48White}>Sign In</Text>
            </View>
            <View style={styles.viewText}>
                <Text style={fontStyles.text24White}>Username:</Text>
                <TextInputWithValidation errors={errorSignIn} 
                    handleTextValue={(value) => {
                        handleContent('userName', value)
                    }} 
                />
                <Text style={fontStyles.text24White}>Password:</Text>
                <TextInput style={fontStyles.textInput} 
                    onChangeText={(value) => 
                    handleContent('password', value)}
                    secureTextEntry={true}
                />
                <Text
                    style={fontStyles.text18White}
                    onPress={() => navigation.navigate("ForgotPassword")}
                >
                    Forgot Password?
                </Text>
            </View>
            <EllipseButtonSecondary
                name={"Sign In"}
                onClick={() => {
                        handleAxiosCall();
                    }
                }
                marginTop={"-5%"}
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
