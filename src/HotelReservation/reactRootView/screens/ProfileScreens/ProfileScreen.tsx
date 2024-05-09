import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import { View, StyleSheet, Text } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import fontStyles from "../../config/StyleSheets/fontStyles";
import axiosAuthCalls from '../../axiosCalls/axiosAuthCalls';

export const ProfileScreen = ({ navigation }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("IsSignedIn", (error, value) => {
            if("true" === value)
                setIsSignedIn(true)
            else
                setIsSignedIn(false)
        })
    }, []);

    return(
    <MainScreen backgroundColor={colors.secondary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={fontStyles.text48White}>Profile</Text>                
            </View>        
            {
                isSignedIn
                ?
                <EllipseButtonPrimary
                    name={"Logout"}
                    onClick={() => {
                        axiosAuthCalls.getLogoutCall()
                        AsyncStorage.setItem("IsSignedIn", JSON.stringify(false))
                        setIsSignedIn(false);
                    }}
                />
                :
                <EllipseButtonPrimary
                    name={"Sign In"}
                    onClick={() => 
                        navigation.navigate("SignIn")
                    }
                />
            }      
            <EllipseButtonPrimary
                marginTop={"5%"}
                name={"Change Profile"}
                onClick={() => navigation.navigate("ChangeProfile")}
            />
            <EllipseButtonPrimary
                marginTop={"5%"}
                name={"Auth Screen"}
                onClick={() => 
                    navigation.navigate("Auth")
                }
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
    },
});
