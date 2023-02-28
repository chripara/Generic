import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import defaultStyles from "../../config/defaultStyles";

export const BookingCreateScreen = ({ navigation }) => (
    <MainScreen backgroundColor={colors.secondary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={defaultStyles.text36White}>Change Email</Text>
            </View>
            <View style={styles.viewText}>
                <Text style={defaultStyles.text20White}>Current Email:</Text>
                <TextInput style={defaultStyles.textInput} />
                <Text style={defaultStyles.text20White}>New Email:</Text>
                <TextInput style={defaultStyles.textInput} />
            </View>
            <EllipseButtonPrimary
                name={"Change Email"}
                onClick={() => navigation.navigate("ChangeEmail")}
                marginTop={"30%"}
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
});
