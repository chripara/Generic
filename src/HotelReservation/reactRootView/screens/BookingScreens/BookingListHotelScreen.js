import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import defaultStyles from "../../config/defaultStyles";
import { List } from "../../components/List";

const content = [
    [
        {
            title: "Hotel:",
            text: "Lake Place Inn 1",            
        },
        {
            title: "Hotel Address:",
            text: "36 Parker StreetOxnard, CA 93035",   
        },
        {
            title: "Room Number:",
            text: "506",   
        },
        {
            title: "Dates:",
            text: "30-03-2023 - 05-04-2024",   
        },
        {
            title: "Cost:",
            text: "300 €",   
        },
        {
            title: "Description:",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survivedLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survivedLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived",   
        }
    ],
    [
        {
            title: "Hotel:",
            text: "Lake Place Inn 2",            
        },
        {
            title: "Hotel Address:",
            text: "36 Parker StreetOxnard, CA 93035",   
        },
        {
            title: "Room Number:",
            text: "506",   
        },
        {
            title: "Dates:",
            text: "30-03-2023 - 05-04-2024",   
        },
        {
            title: "Cost:",
            text: "300 €",   
        },
        {
            title: "Description:",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived",   
        }  
    ],
    [
            {
            title: "Hotel:",
            text: "Lake Place Inn 3",            
        },
        {
            title: "Hotel Address:",
            text: "36 Parker StreetOxnard, CA 93035",   
        },
        {
            title: "Room Number:",
            text: "506",   
        },
        {
            title: "Dates:",
            text: "30-03-2023 - 05-04-2024",   
        },
        {
            title: "Cost:",
            text: "300 €",   
        },
        {
            title: "Description:",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived",   
        }
    ],
    [   
            {
            title: "Hotel:",
            text: "Lake Place Inn 4",            
        },
        {
            title: "Hotel Address:",
            text: "36 Parker StreetOxnard, CA 93035",   
        },
        {
            title: "Room Number:",
            text: "506",   
        },
        {
            title: "Dates:",
            text: "30-03-2023 - 05-04-2024",   
        },
        {
            title: "Cost:",
            text: "300 €",   
        },
        {
            title: "Description:",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived",   
        }
    ],
    [
        {
            title: "Hotel:",
            text: "Lake Place Inn 5",            
        },
        {
            title: "Hotel Address:",
            text: "36 Parker StreetOxnard, CA 93035",   
        },
        {
            title: "Room Number:",
            text: "506",   
        },
        {
            title: "Dates:",
            text: "30-03-2023 - 05-04-2024",   
        },
        {
            title: "Cost:",
            text: "300 €",   
        },
        {
            title: "Description:",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived",   
        }
    ]
];

export const BookingListHotelScreen = ({ navigation }) => (
    <MainScreen backgroundColor={colors.secondary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                    <Text style={defaultStyles.text36White}>Bookings</Text>                
            </View>
            <List contentPair={content} numberOfPairs={5}  />
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
        marginVertical: "3%",
        paddingHorizontal: "5%",
    },
});
