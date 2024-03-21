import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import { EllipseButtonSecondary } from "../../components/EllipseButtonSecondary";
import fontStyles from "../../config/StyleSheets/fontStyles";

export const ForgetPasswordScreen = ({ navigation }) => (
    <MainScreen backgroundColor={colors.primary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={fontStyles.text48White}>Forgot Password</Text>
            </View>
            <View style={styles.viewText}>
                <Text style={fontStyles.text24White}>Email:</Text>
                <TextInput style={fontStyles.textInput} />                
            </View>
            <EllipseButtonSecondary
                name={"Send email"}
                onClick={() => navigation.navigate("Welcome")}
                marginTop={"10%"}
            />
            <View style={{...styles.viewText, marginTop: "30%"}}>
                <Text style={{...fontStyles.text24White, textAlign: 'center'}}>Please check your</Text>
                <Text style={{...fontStyles.text24White, textAlign: 'center'}}>email for reset</Text>
                <Text style={{...fontStyles.text24White, textAlign: 'center'}}>password code.</Text>
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
    }
});
