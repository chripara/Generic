import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import { EllipseButtonSecondary } from "../../components/EllipseButtonSecondary";
import defaultStyles from "../../config/defaultStyles";

export const ForgetPasswordScreen = ({ navigation }) => (
    <MainScreen backgroundColor={colors.primary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={defaultStyles.text36White}>Forgot Password</Text>
            </View>
            <View style={styles.viewText}>
                <Text style={defaultStyles.text20White}>Email:</Text>
                <TextInput style={defaultStyles.textInput} />                
            </View>
            <EllipseButtonSecondary
                name={"Send email"}
                onClick={() => navigation.navigate("Welcome")}
                marginTop={"10%"}
            />
            <View style={{...styles.viewText, marginTop: "30%"}}>
                <Text style={{...defaultStyles.text20White, textAlign: 'center'}}>Please check your</Text>
                <Text style={{...defaultStyles.text20White, textAlign: 'center'}}>email for reset</Text>
                <Text style={{...defaultStyles.text20White, textAlign: 'center'}}>password code.</Text>
            </View>
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
