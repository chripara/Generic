import React, { useState } from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import { EllipseButtonSecondary } from "../../components/EllipseButtonSecondary";
import colors from "../../config/colors";
import fontStyles from "../../config/StyleSheets/fontStyles";
import { MainScreen } from "../MainScreen";
import { NavigationContainer } from "@react-navigation/native";
import { MainTabNavigator } from "../../tabNavigators/MainTabNavigator";

export const WelcomeScreen = () => {
    const [proceed, setProceed] = useState<Boolean>(false);
    const handleState = () => {
        setProceed(true);
    }

    return(           
        proceed
        ?        
            <NavigationContainer>            
                <MainTabNavigator />
            </NavigationContainer>  
        :            
        <MainScreen backgroundColor={colors.primary}>
            <View style={styles.container}>
                <View style={styles.viewText}>
                    <Text style={fontStyles.text40White}>Welcome</Text>
                    <Text style={fontStyles.text40White}>to</Text>
                    <Text style={fontStyles.text40White}>Hotel</Text>
                    <Text style={fontStyles.text40White}>Reservation</Text>
                </View>
                <Image
                    style={styles.image}
                    source={require("../../../assets/HotelImage.jpg")}
                />
                <EllipseButtonSecondary
                    onClick={() => {
                        console.log("asdfasdf");
                        handleState();
                    }}
                    name="Get started"
                    marginTop={60}
                />
            </View>
        </MainScreen>              
    )
};

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
