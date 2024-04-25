import { EllipseButtonSecondary } from "../../components/EllipseButtonSecondary";
import { View, StyleSheet, Text } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import fontStyles from "../../config/StyleSheets/fontStyles";
import axiosAuthCalls from '../../axiosCalls/axiosAuthCalls';

export const AuthScreen = ({ route, navigation  }) => (
    <MainScreen backgroundColor={colors.primary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={fontStyles.text48White}>Do already</Text>
                <Text style={fontStyles.text48White}>have an</Text>
                <Text style={fontStyles.text48White}>account?</Text>
            </View>
            <EllipseButtonSecondary
                name={"Sign In"}
                onClick={() => navigation.navigate("SignIn")}
            />
            <EllipseButtonSecondary
                name={"Sign Up"}
                marginTop={"8%"}
                onClick={() => navigation.navigate("SignUp")}
            />
            <EllipseButtonSecondary
                name={"Logout"}
                marginTop={"8%"}
                onClick={() => axiosAuthCalls.getLogoutCall()}
            />
            <EllipseButtonSecondary
                name={"Booking List Hotel"}
                marginTop={"8%"}
                onClick={() => navigation.navigate("BookingListHotel")}
            />   
            <EllipseButtonSecondary
                name={"Verify Phone Number"}
                marginTop={"8%"}
                onClick={() => navigation.navigate("VerifyPhoneNumber")}
            /> 
            <EllipseButtonSecondary
                name={"Reset Password"}
                marginTop={"8%"}
                onClick={() => navigation.navigate("ResetPassword")}
            />
            <EllipseButtonSecondary
                name={"Change Email"}
                marginTop={"8%"}
                onClick={() => navigation.navigate("ChangePassword")}
            />
            <EllipseButtonSecondary
                name={"Change Password"}
                marginTop={"8%"}
                onClick={() => navigation.navigate("VerifyChangeEmail")}
            />  
            <View style={styles.viewText}>
                <Text style={fontStyles.text48White}>Don't you want</Text>
                <Text style={fontStyles.text48White}>to create</Text>
                <Text style={fontStyles.text48White}>an account?</Text>
            </View>            
            <EllipseButtonSecondary
                name={"Go to Profile"}
                marginTop={10}
                onClick={() => 
                    navigation.navigate("Profile")
                } 
            />
        </View>
    </MainScreen>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "3%",
    },
    viewText: {
        position: "relative",
        marginVertical: "10%",
        paddingHorizontal: "20%",
    },
});
