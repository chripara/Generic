import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import defaultStyles from "../../config/defaultStyles";
import { List } from "../../components/List";

const content = [
    [
        {
            title: "Hotel:",
            text: "Lake Place Inn 1",            
        },
        {
            title: "City:",
            text: "London",   
        },
        {
            title: "Hotel Address:",
            text: "36 Parker StreetOxnard, CA 93035",   
        },
        {
            title: "Post Code:",
            text: "31572",   
        },
        {
            title: "PhoneNumber:",
            text: "941-812-2553",   
        },
        {
            title: "Rate:",
            text: "3 star",   
        },
        {
            title: "Type:",
            text: "Hostel",   
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
            title: "City:",
            text: "London",   
        },
        {
            title: "Hotel Address:",
            text: "36 Parker StreetOxnard, CA 93035",   
        },
        {
            title: "Post Code:",
            text: "31572",   
        },
        {
            title: "PhoneNumber:",
            text: "941-812-2553",   
        },
        {
            title: "Rate:",
            text: "3 star",   
        },
        {
            title: "Type:",
            text: "Hostel",   
        },
        {
            title: "Description:",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survivedLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survivedLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived",   
        }
    ],
    [
        {
            title: "Hotel:",
            text: "Lake Place Inn 3",            
        },
        {
            title: "City:",
            text: "London",   
        },
        {
            title: "Hotel Address:",
            text: "36 Parker StreetOxnard, CA 93035",   
        },
        {
            title: "Post Code:",
            text: "31572",   
        },
        {
            title: "PhoneNumber:",
            text: "941-812-2553",   
        },
        {
            title: "Rate:",
            text: "3 star",   
        },
        {
            title: "Type:",
            text: "Hostel",   
        },
        {
            title: "Description:",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survivedLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survivedLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived",   
        }
    ],
    [
        {
            title: "Hotel:",
            text: "Lake Place Inn 4",            
        },
        {
            title: "City:",
            text: "London",   
        },
        {
            title: "Hotel Address:",
            text: "36 Parker StreetOxnard, CA 93035",   
        },
        {
            title: "Post Code:",
            text: "31572",   
        },
        {
            title: "PhoneNumber:",
            text: "941-812-2553",   
        },
        {
            title: "Rate:",
            text: "3 star",   
        },
        {
            title: "Type:",
            text: "Hostel",   
        },
        {
            title: "Description:",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survivedLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survivedLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived",   
        }
    ]
]    

export const HotelListScreen = ({ navigation }) => {

    const [state, setState] = useState(content);

    const deleteFunc = (index) => {
        content.splice(index, 1);
        setState(content);        
    }

    return(
        <MainScreen backgroundColor={colors.secondary}>
            <View style={styles.container}>
                <View style={styles.viewText}>
                    <Text style={defaultStyles.text36White}>Hotels</Text>
                </View>
                <List contentPair={content} numberOfPairs={8} hasDelete={true} deleteFunc={deleteFunc}/>
                <View style={{ marginBottom: 20 }}>
                    <EllipseButtonPrimary name={"Select Hotel"} onClick={() => {console.log("aasdfasdf")}} marginTop={-50}/> 
                </View>
            </View>
        </MainScreen>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewText: {
        position: "relative",
        marginBottom: "-10%",
        paddingHorizontal: "5%",
    },
});