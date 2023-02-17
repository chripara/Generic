import React from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import { EllipseButtonSecondary } from "../../components/EllipseButtonSecondary";
import colors from "../../config/colors";
import defaultStyles from "../../config/defaultStyles";
import { MainScreen } from "../MainScreen";

export const WelcomeScreen = ({ navigation }) => (
    <MainScreen backgroundColor={colors.primary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={defaultStyles.text36White}>Welcome</Text>
                <Text style={defaultStyles.text36White}>to</Text>
                <Text style={defaultStyles.text36White}>Hotel</Text>
                <Text style={defaultStyles.text36White}>Reservation</Text>
            </View>
            <Image
                style={styles.image}
                source={require("../../../assets/HotelImage.jpg")}
            />
            <EllipseButtonSecondary
                onClick={() => {
                    navigation.navigate("Auth");
                }}
                name="Get started"
                marginTop={60}
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
        paddingHorizontal: "20%",
    },
    image: {
        position: "relative",
        alignSelf: "center",
        borderRadius: 13,
        width: 0.9 * Dimensions.get("screen").width,
        height: 0.35 * Dimensions.get("screen").height,
    },
});
