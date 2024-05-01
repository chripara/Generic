import { useState } from "react";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import fontStyles from "../../config/StyleSheets/fontStyles";
import axiosAuthCalls from '../../axiosCalls/axiosAuthCalls';
import IEditProfile from "../../interfaces/Auth/IEditProfile";
import { TextInputWithValidation } from "../../components/TextInputWithValidation";

export const EditProfileScreen = ({ navigation }) => {  

    const[errorUserName, setErrorUserName] = useState<string[]>();

    const [rawBody, setRawBody] = useState<IEditProfile>(
        {
            firstName: '',
            lastName: '',
            location: ''
        } as IEditProfile
    );

    const handleAxiosCall = () => {
        if(
            rawBody.firstName.length > 1
            && rawBody.lastName.length > 1
            && rawBody.location.length > 1
        )
        {
            var result = axiosAuthCalls.postEditProfileCall(rawBody);
            setErrorUserName([]);
            
            result.catch((error) => {   
                console.log(error);                     
                setErrorUserName([
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
    return (
        <MainScreen backgroundColor={colors.secondary}>
            <View style={styles.container}>
                <View style={styles.viewText}>
                    <Text style={fontStyles.text48White}>Edit Profile</Text>                
                </View>
                <View style={styles.viewText}>
                    <Text style={fontStyles.text24White}>FirstName:</Text>                
                    <TextInputWithValidation errors={errorUserName}
                        handleTextValue={(value) => handleContent('firstName', value)} />
                    <Text style={fontStyles.text24White}>LastName:</Text>               
                    <TextInput style={fontStyles.textInput} onChangeText={(value) => 
                        handleContent('lastName', value)}/>
                    <Text style={fontStyles.text24White}>Location:</Text>                
                    <TextInput style={fontStyles.textInput} onChangeText={(value) => 
                        handleContent('location', value)}/>
                </View>
                <EllipseButtonPrimary
                    marginTop={"3%"}
                    name={"Submit changes"}
                    onClick={() => 
                        handleAxiosCall()
                    }
                />
            </View>
        </MainScreen>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: "5%"
    },
    viewText: {
        position: "relative",
        marginVertical: "3%",
        paddingHorizontal: "5%",
    },
});
