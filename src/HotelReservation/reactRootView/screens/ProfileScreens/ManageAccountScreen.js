import React from "react";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import { Card } from "../../components/Card";
import { View, StyleSheet, Text } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import fontStyles from "../../config/StyleSheets/fontStyles";


const content = [
    {
        title: "FirstName:",
        text: "Luitgard",            
    },
    {
        title: "LastName:",
        text: "Abdullah",   
    },
    {
        title: "Location:",
        text: "9935 Briarwood DriveLakeville, MN 55044",   
    },
    {
        title: "Email:",
        text: "LuitgardAbdullah@gmail.com",   
    },
    {
        title: "Phone Number:",
        text: "941-812-2553",   
    }
]

export const ManageAccountScreen = ({ navigation }) => (    
    <MainScreen backgroundColor={colors.secondary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={fontStyles.text48White}>Manage Account</Text>                
            </View>
            <EllipseButtonPrimary
                marginTop={"10%"}
                name={"Change password"}
                onClick={() => navigation.navigate("ChangePassword")}
            />
            <EllipseButtonPrimary
                marginTop={"10%"}
                name={"Change email"}
                onClick={() => navigation.navigate("ChangeEmail")}
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
