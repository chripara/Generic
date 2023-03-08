import React from "react";
import { StyleSheet, TouchableOpacity, Text, Dimensions, View } from "react-native";
import colors from "../config/colors";
import defaultStyles from "../config/defaultStyles";

const width = Dimensions.get('window').width;

export const EllipseButtonSecondary = ({ onClick, name, marginTop }) => {
    return (
        <TouchableOpacity
            onPress={onClick}
            style={{ ...styles.container, marginTop: marginTop }}
        >
            <View style={styles.viewContainer}>
                <Text style={defaultStyles.text20Black}>{name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width ,
        height: 50,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        
    },
    viewContainer: {
        width: width * 0.6,
        height: 40,
        backgroundColor: colors.secondary,
        // zIndex: 1,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 25,
        shadowColor: colors.black,
        shadowRadius: 10,
        elevation: 8
    }
});
