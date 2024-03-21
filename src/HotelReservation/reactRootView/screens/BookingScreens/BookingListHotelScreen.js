import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import fontStyles from "../../config/StyleSheets/fontStyles";
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

export const BookingListHotelScreen = ({ navigation }) => {
    
    const [state, setState] = useState(content);

    const deleteFunc = (index) => {
        content.splice(index, 1);
        setState(content);        
    }
 
    return(
    <MainScreen backgroundColor={colors.secondary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={fontStyles.text48White}>Bookings</Text>                
            </View>
            <List contentPair={state} numberOfPairs={6} hasDelete={true} deleteFunc={deleteFunc} hasDescription={true}/>
        </View>
    </MainScreen>
)};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewText: {
        position: "relative",
        marginVertical: "3%", // why 3% instea of 2% 
        paddingHorizontal: "5%",
    },
});
