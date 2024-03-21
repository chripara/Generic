import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import fontStyles from "../../config/StyleSheets/fontStyles";

export const ChangePasswordScreen = ({ navigation }) => (
    <MainScreen backgroundColor={colors.secondary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={fontStyles.text48White}>Change Password</Text>
            </View>
            <View style={styles.viewText}>
                <Text style={fontStyles.text24White}>Old Password:</Text>
                <TextInput style={fontStyles.textInput} />
                <Text style={fontStyles.text24White}>New Password:</Text>
                <TextInput style={fontStyles.textInput} />
                <Text style={fontStyles.text24White}>Confirm New Password:</Text>
                <TextInput style={fontStyles.textInput} />
            </View>
            <EllipseButtonPrimary
                name={"Change Password"}
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
    }
});
