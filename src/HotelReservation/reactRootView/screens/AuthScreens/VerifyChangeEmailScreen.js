import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import { EllipseButtonSecondary } from "../../components/EllipseButtonSecondary";
import fontStyles from "../../config/StyleSheets/fontStyles";

export const VerifyChangeEmailScreen = ({ navigation }) => (
    <MainScreen backgroundColor={colors.primary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={fontStyles.text48White}>Verify Change</Text>
                <Text style={fontStyles.text48White}>Number</Text>
            </View>
            <View style={styles.viewText}>
                <Text style={fontStyles.text24White}>Code:</Text>
                <TextInput style={fontStyles.textInput} />
                <Text style={fontStyles.text24White}>Email:</Text>
                <TextInput style={fontStyles.textInput} />
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
    }
});
