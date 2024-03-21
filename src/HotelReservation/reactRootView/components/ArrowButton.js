import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import colors from "../config/colors";
import fontStyles from "../config/StyleSheets/fontStyles";

export const ArrowButton = ({ onClick, attitude, marginTop, size }) => {
    return (
        <TouchableOpacity
            onPress={onClick}
            //style={{ ...styles.container, marginTop: marginTop }}
        >
            <Image 
                source={require("../../assets/generalIcons/ArrowLeft.png")}
                style={
                    [attitude === "right" && styles.imageRight,
                    attitude === "up" && styles.imageUp,
                    attitude === "down"  && styles.imageDown,
                    size === "small" && styles.small,
                    size === "medium" && styles.medium,
                    size === "large" && styles.large] 
                } 
            />
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        width: "60%",
        height: 45,
        backgroundColor: colors.secondary,
        zIndex: 1,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 21,
        shadowColor: colors.black,
        shadowRadius: 10,
        elevation: 8
    },
    imageRight: {
      transform: [{rotate: '180deg'}],
    },
    imageUp: {
      transform: [{rotate: '90deg'}],
    },
    imageDown: {
      transform: [{rotate: '270deg'}],
    },
    small: {
      height: 20,
      width: 20,
    },
    medium: {
      height: 30,
      width: 30,
    },
    large: {
      height: 15,
      width: 15,
    }
});