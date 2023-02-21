import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import colors from "../config/colors";
import defaultStyles from "../config/defaultStyles";

export const ArrowButton = ({ onClick, isRight, marginTop }) => {
    return (
        <TouchableOpacity
            onPress={onClick}
            //style={{ ...styles.container, marginTop: marginTop }}
        >
            <Image 
                source={require("../../assets/generalIcons/ArrowLeft.png")}
                style={[isRight ? styles.imageRight : styles.imageLeft]} 
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
      height: 30,
      width: 30,
      transform: [{rotate: '180deg'}],
    },
    imageLeft: {
      height: 30,
      width: 30,
      //transform: [{rotate: '180deg'}],
    }
});