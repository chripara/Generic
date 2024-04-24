import React from "react";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import fontStyles from "../../config/StyleSheets/fontStyles";

// const content = [
//     {
//         title: "FirstName:",
//         text: "Luitgard",            
//     },
//     {
//         title: "LastName:",
//         text: "Abdullah",   
//     },
//     {
//         title: "Location:",
//         text: "9935 Briarwood DriveLakeville, MN 55044",
//     },
//     {
//         title: "Email:",
//         text: "LuitgardAbdullah@gmail.com",   
//     },
//     {
//         title: "Phone Number:",
//         text: "941-812-2553",   
//     }
// ]

//TODO: Not endpoint yet for that screen.
//TODO: Edit profile screen needs change email & phone buttons for navigation.

export const EditProfileScreen = ({ navigation }) => (    
    <MainScreen backgroundColor={colors.secondary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={fontStyles.text48White}>Edit Profile</Text>                
            </View>
            <View style={styles.viewText}>
                <Text style={fontStyles.text24White}>FirstName:</Text>
                <TextInput style={fontStyles.textInput} />
                <Text style={fontStyles.text24White}>LastName:</Text>
                <TextInput style={fontStyles.textInput} />
                <Text style={fontStyles.text24White}>Location:</Text>
                <TextInput style={fontStyles.textInput} />
                {/* <Text style={fontStyles.text24White}>Email:</Text>
                <TextInput style={fontStyles.textInput} />
                <Text style={fontStyles.text24White}>Phone Number:</Text>
                <TextInput style={fontStyles.textInput} /> */}
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
