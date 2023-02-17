import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import { EllipseButtonSecondary } from "../../components/EllipseButtonSecondary";
import defaultStyles from "../../config/defaultStyles";

export const VerifyChangeEmailScreen = ({ navigation }) => (
    <MainScreen backgroundColor={colors.primary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={defaultStyles.text36White}>Verify Change</Text>
                <Text style={defaultStyles.text36White}>Number</Text>
            </View>
            <View style={styles.viewText}>
                <Text style={defaultStyles.text20White}>Code:</Text>
                <TextInput style={defaultStyles.textInput} />
                <Text style={defaultStyles.text20White}>Email:</Text>
                <TextInput style={defaultStyles.textInput} />
            </View>
            <EllipseButtonSecondary
                name={"Verify Email"}
                onClick={() => navigation.navigate("Welcome")}
                marginTop={"10%"}
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
