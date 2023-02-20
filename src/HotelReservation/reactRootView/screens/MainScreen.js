import React from "react";
import {
    SafeAreaView,
    Platform,
    StatusBar,
    StyleSheet,
    ScrollView,
} from "react-native";

export const MainScreen = ({ children, backgroundColor }) => (
    <SafeAreaView
        style={{ ...styles.container, backgroundColor: backgroundColor }}
    >
        <ScrollView>{children}</ScrollView>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
});
