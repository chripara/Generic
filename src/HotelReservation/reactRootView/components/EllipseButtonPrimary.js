import React from "react";
import { StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import colors from "../config/colors";
import fontStyles from "../config/StyleSheets/fontStyles";

const width = Dimensions.get('window').width;

export const EllipseButtonPrimary = ({ onClick, name, marginTop }) => {
    return (
        <TouchableOpacity
            onPress={onClick}
            style={{ ...styles.container, marginTop: marginTop }}
        >
            <Text style={fontStyles.text24White}>{name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width * 0.7,
        height: 45,
        backgroundColor: colors.primary,
        zIndex: 1,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 30,
        shadowColor: colors.black,
        shadowRadius: 10,
        elevation: 8
    } 
});
