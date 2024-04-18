// import React from "react";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import { Card } from "../../components/Card";
import { View, StyleSheet, Text } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import fontStyles from "../../config/StyleSheets/fontStyles";
import axiosCalls from '../../axiosCalls/axiosCalls';

export const ProfileScreen = ({ navigation }) => (    
    <MainScreen backgroundColor={colors.secondary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={fontStyles.text48White}>Profile</Text>                
            </View>         
            <EllipseButtonPrimary
                marginTop={"8%"}
                name={"Logout"}
                onClick={() => axiosCalls.getData()}
            />
            <EllipseButtonPrimary
                marginTop={"5%"}
                name={"Edit Profile"}
                onClick={() => navigation.navigate("EditProfile")}
            />
            <EllipseButtonPrimary
                marginTop={"5%"}
                name={"Sign In"}
                onClick={() => navigation.navigate("SignIn")}
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
        marginVertical: "5%",
        paddingHorizontal: "5%",
    },
});
