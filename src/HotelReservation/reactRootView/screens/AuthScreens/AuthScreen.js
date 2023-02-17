import React from "react";
import { EllipseButtonSecondary } from "../../components/EllipseButtonSecondary";
import { View, StyleSheet, Text } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import defaultStyles from "../../config/defaultStyles";

export const AuthScreen = ({ navigation }) => (
    <MainScreen backgroundColor={colors.primary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={defaultStyles.text36White}>Do already</Text>
                <Text style={defaultStyles.text36White}>have an</Text>
                <Text style={defaultStyles.text36White}>account?</Text>
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
                <Text style={defaultStyles.text36White}>Don't you want</Text>
                <Text style={defaultStyles.text36White}>to create</Text>
                <Text style={defaultStyles.text36White}>an account?</Text>
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
