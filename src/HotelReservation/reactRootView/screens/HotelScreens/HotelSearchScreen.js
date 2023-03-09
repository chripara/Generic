import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Dimensions } from "react-native";
import { MainScreen } from "../MainScreen";
import { DualSelector } from "../../components/DualSelector";
import colors from "../../config/colors";
import defaultStyles from "../../config/defaultStyles";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import { List } from "../../components/List";
import { StackActions } from "@react-navigation/native";

const width = Dimensions.get('window').width;


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
            title: "Phone Number:",
            text: "941-812-2553",   
        },
        {
            title: "Rate:",
            text: "3 star",   
        },
        {
            title: "Type:",
            text: "Hostel",   
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
            title: "Phone Number:",
            text: "941-812-2553",   
        },
        {
            title: "Rate:",
            text: "3 star",   
        },
        {
            title: "Type:",
            text: "Hostel",   
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
            title: "Phone Number:",
            text: "941-812-2553",   
        },
        {
            title: "Rate:",
            text: "3 star",   
        },
        {
            title: "Type:",
            text: "Hostel",   
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
            title: "Phone Number:",
            text: "941-812-2553",   
        },
        {
            title: "Rate:",
            text: "3 star",   
        },
        {
            title: "Type:",
            text: "Hostel",   
        }        
    ]
]    

export const HotelSearchScreen = ({ navigation }) => {

    const [leftPage, setLeftPage] = useState();
    const [rightPage, setRightPage] = useState();
    const [state, setState] = useState(0);

    const SelectHotelCard = () => {
        return(
            <View>
                <List contentPair={content} numberOfPairs={7} />
                <EllipseButtonPrimary marginTop={width * 0.03} name={"Select Hotel"} />
                <View style={{height: 5}}/>
            </View>
        )
    }

    const CreateBookingCard = () => {
        return(
            <Text>asdfasdfasdfassdf</Text>
        )
    }
    
    const handleFindAvailableRooms = (isLeft) => {
        console.log('isLeft: ', isLeft);
        if(isLeft){
            setLeftPage(SelectHotelCard());
        }
        if(!isLeft){
            setRightPage(CreateBookingCard());
        }
            
        setState(Math.random())
    }

    const FindAvailableRoomsForHotelForm = () => {
        return(
            <View style={styles.viewFormStyle}>
                <Text style={defaultStyles.text20White}>Hotel Name:</Text>
                <TextInput style={defaultStyles.textInput} />
                <Text style={defaultStyles.text20White}>Capacity:</Text>
                <TextInput style={defaultStyles.textInput} />
                <EllipseButtonPrimary 
                    name={"Find Available Rooms"} 
                    marginTop={width * 0.3} 
                    onClick={() => {console.log('asdfasdfasdfasdf'); handleFindAvailableRooms(true);}}
                />
            </View>
        )
    }    

    const FindAvailableRoomsForDateForm = () => {
        return(
            <View style={styles.viewFormStyle}>
                <Text style={defaultStyles.text20White}>City:</Text>
                <TextInput style={defaultStyles.textInput} />
                <Text style={defaultStyles.text20White}>Capacity:</Text>
                <TextInput style={defaultStyles.textInput} />
                <Text style={defaultStyles.text20White}>Minimum Price Per Day:</Text>
                <TextInput style={defaultStyles.textInput} />
                <Text style={defaultStyles.text20White}>Maximum Price Per Day:</Text>
                <TextInput style={defaultStyles.textInput} />
                <EllipseButtonPrimary 
                    name={"Find Available Rooms"} 
                    marginTop={width * 0.05} 
                    onClick={() => handleFindAvailableRooms(false)}
                />
            </View>
        )
    }

    if(leftPage === undefined)    
        setLeftPage(FindAvailableRoomsForHotelForm());
    if(rightPage === undefined)    
        setRightPage(FindAvailableRoomsForDateForm());

    return(
        <MainScreen backgroundColor={colors.secondary}>
            <View style={styles.container}>
                <View style={styles.viewText}>
                    <Text style={defaultStyles.text36White}>Hotels</Text>
                </View>
                <DualSelector leftPage={leftPage} 
                    rightPage={rightPage} 
                />
                {/* {console.log(state)}                 */}
            </View>
        </MainScreen>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "3%",
    },
    viewText: {
        position: "relative",
        marginVertical: "2%",
        paddingHorizontal: "5%",
    },
    viewFormStyle: {
        width: width * 0.9,
        height: width * 1.1,
        marginTop: width * 0.05
    },
    textInput: {
        height: 120,
        textAlign: "left",
        textAlignVertical: 'top',
        fontFamily: "Italiana-Regular",
        fontSize: 12,
        backgroundColor: colors.light,
        paddingLeft: "4%",
        borderRadius: 5,
        paddingVertical: 10
    }
});