import React from "react";
import { EllipseButtonSecondary } from "../../components/EllipseButtonSecondary";
import { View, StyleSheet, Text } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import fontStyles from "../../config/StyleSheets/fontStyles";
 
export const AuthScreen = ({ navigation }) => (
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
            <View style={styles.viewText}>
                <Text style={fontStyles.text48White}>Don't you want</Text>
                <Text style={fontStyles.text48White}>to create</Text>
                <Text style={fontStyles.text48White}>an account?</Text>
            </View>
            <EllipseButtonSecondary
                name={"Proceed as Guests"}
                onClick={() => navigation.navigate("Welcome")}
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
