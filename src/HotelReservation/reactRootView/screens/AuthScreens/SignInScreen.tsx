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
    
    await result.then( async (response) => {   
        const cnst = response.headers["set-cookie"][0];  
        await AsyncStorage.setItem(constants.AuthCookie, cnst);       

        let authCookie = "";
        await AsyncStorage.getItem(constants.AuthCookie).then((value) => {
            authCookie = value;
            console.log("Auth ", authCookie);
        });

        // select right cookie             
        // console.log('Response Inside result then ', cnst)

        // console.log(response.config.headers.)
        
        // setCookie(cnst);
        // try {

        // AsyncStorage.setItem('.AspNetCore.Identity.Application', response.headers['set-cookie'][0]);        
        // }

        // catch(e) { 

        //     console.log('Error ', e);
        // }

    })
    .catch((error) => {          
        setErrorSignIn([             
            "• Username or password not much plz try again."
        ]);                
        
        console.log('Error ',error);
        console.log('Error message ',error.message);
        //console.log('Error response data ',error.response.data);
    });

    setIsSignInCompletedSuccessfully(!isSignInCompletedSuccessfully);  
    
    // const asd = await AsyncStorage.getItem(cookieName);
    // const authCookie = await AsyncStorage.getItem(constants.AuthCookie).then((value) => {
    //     console.log('Async: ', value);
    // })
    // .then(res => {
    //     console.log('State:   ', res);
    // });
    // const cookie = AsyncStorage.getItem(cookieName).then((response) => {
    //     if(cookieName){
    //     this.setState({mobileNumber: cookieName});
    //     console.log('State:   ', this.state.mobileNumber);
    // }})   
    // console.log('cookie \n');
    // console.log('cookie \n');
    // console.log('cookie \n');
    // console.log('cookie \n');
    // console.log("AAA:  ", aa);
    // cookie.then((response) => {
    //     console.log('Cookie ', response);
    // });
    //console.log('Cookie ', asd);
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
                        //navigation.navigate("Welcome")
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
