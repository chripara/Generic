import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import { EllipseButtonSecondary } from "../../components/EllipseButtonSecondary";
import defaultStyles from "../../config/defaultStyles";

export const SignInScreen = ({ navigation }) => (
    <MainScreen backgroundColor={colors.primary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={defaultStyles.text36White}>Sign In</Text>
            </View>
            <View style={styles.viewText}>
                <Text style={defaultStyles.text20White}>Username:</Text>
                <TextInput style={defaultStyles.textInput} />
                <Text style={defaultStyles.text20White}>Password:</Text>
                <TextInput style={defaultStyles.textInput} />
                <Text
                    style={defaultStyles.text14White}
                    onPress={() => navigation.navigate("Auth")}
                >
                    Forgot Password?
                </Text>
            </View>
            <EllipseButtonSecondary
                name={"Sign In"}
                onClick={() => navigation.navigate("Welcome")}
                marginTop={"50%"}
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
        paddingHorizontal: "5%",
    },
    clickableText: {},
});
