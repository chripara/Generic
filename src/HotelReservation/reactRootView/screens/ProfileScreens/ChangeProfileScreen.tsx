import { useEffect } from "react";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import { View, StyleSheet, Text } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import fontStyles from "../../config/StyleSheets/fontStyles";

export const ChangeProfileScreen = ({ navigation }) => {
    return(
    <MainScreen backgroundColor={colors.secondary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={fontStyles.text48White}>Change Profile</Text>                
            </View> 
            <EllipseButtonPrimary
                name={"EditProfile"}
                onClick={() => navigation.navigate("EditProfile")}
            /> 
            <EllipseButtonPrimary
                name={"Change Email"}
                marginTop={"5%"}
                onClick={() => 
                    navigation.navigate("SignIn")
                }
            /> 
            <EllipseButtonPrimary
                name={"Change Password"}
                marginTop={"5%"}
                onClick={() => {
                    axiosAuthCalls.getLogoutCall()
                    AsyncStorage.setItem("IsSignedIn", JSON.stringify(false))
                    setIsSignedIn(false);
                }}
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
