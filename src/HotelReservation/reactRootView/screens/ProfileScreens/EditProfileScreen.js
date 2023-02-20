import React from "react";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import defaultStyles from "../../config/defaultStyles";


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

export const EditProfileScreen = ({ navigation }) => (    
    <MainScreen backgroundColor={colors.secondary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={defaultStyles.text36White}>Edit Profile</Text>                
            </View>
            <View style={styles.viewText}>
                <Text style={defaultStyles.text20White}>FirstName:</Text>
                <TextInput style={defaultStyles.textInput} />
                <Text style={defaultStyles.text20White}>LastName:</Text>
                <TextInput style={defaultStyles.textInput} />
                <Text style={defaultStyles.text20White}>Location:</Text>
                <TextInput style={defaultStyles.textInput} />
                <Text style={defaultStyles.text20White}>Email:</Text>
                <TextInput style={defaultStyles.textInput} />
                <Text style={defaultStyles.text20White}>Phone Number:</Text>
                <TextInput style={defaultStyles.textInput} />
            </View>
            <EllipseButtonPrimary
                marginTop={"3%"}
                name={"Submit changes"}
                onClick={() => navigation.navigate("SubmitChanges")}
            />
        </View>
    </MainScreen>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: "5%"
    },
    viewText: {
        position: "relative",
        marginVertical: "3%",
        paddingHorizontal: "5%",
    },
});
