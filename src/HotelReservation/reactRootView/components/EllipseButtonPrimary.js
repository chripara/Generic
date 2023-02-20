import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../config/colors";
import defaultStyles from "../config/defaultStyles";

export const EllipseButtonPrimary = ({ onClick, name, marginTop }) => {
    return (
        <TouchableOpacity
            onPress={onClick}
            style={{ ...styles.container, marginTop: marginTop }}
        >
            <Text style={defaultStyles.text20White}>{name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "75%",
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
