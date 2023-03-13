import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Dimensions } from "react-native";
import { MainScreen } from "../MainScreen";
import { DualSelector } from "../../components/DualSelector";
import colors from "../../config/colors";
import defaultStyles from "../../config/defaultStyles";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import { List } from "../../components/List";
import { StackActions } from "@react-navigation/native";
import { Calendar } from "../../components/Calendar";

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

    const [leftPage, setLeftPage] = useState(true);
    const [rightPage, setRightPage] = useState(true);
    const [state, setState] = useState(0);
    const [date, setDate] = useState(new Date());

    const handleFindAvailableRooms = (isLeft) => {
        if(isLeft){
            setLeftPage(false);
        }
        if(!isLeft){
            setRightPage(false);
        }            
        setState(Math.random())
    }

    return(
        <MainScreen backgroundColor={colors.secondary}>
            <View style={styles.container}>
                <View style={styles.viewText}>
                    <Text style={defaultStyles.text36White}>Hotels</Text>
                </View>
                <DualSelector 
                    leftPage={
                        leftPage ?
                            <View style={styles.viewFormStyle}>
                                <Text style={defaultStyles.text20White}>Hotel Name:</Text>
                                <TextInput style={defaultStyles.textInput} />
                                <Text style={defaultStyles.text20White}>Capacity:</Text>
                                <TextInput style={defaultStyles.textInput} />
                                <EllipseButtonPrimary 
                                    name={"Find Available Rooms"} 
                                    marginTop={width * 0.3} 
                                    onClick={() => {handleFindAvailableRooms(true);}}
                                />
                            </View>
                            :    
                            <View>
                                <List contentPair={content} numberOfPairs={7} />
                                <EllipseButtonPrimary marginTop={width * 0.03} name={"Select Hotel"} />
                                <View style={{height: 5}}/>
                            </View>
                    } 
                    rightPage={
                        rightPage ?
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
                            :
                            <View>
                                <View style={styles.viewText}>
                                    <Text style={defaultStyles.text24Black}>Lake Place Inn</Text>
                                </View>
                                <View style={styles.cardStyle}>                    
                                    <View style={styles.horizontalViewStyle}>
                                        <View style={styles.verticalViewStyle}>
                                            <Text style={defaultStyles.text16White}>Cost / day</Text>
                                            <Text style={defaultStyles.text20Black}>50 €</Text>
                                        </View>
                                        <View style={styles.verticalViewStyle}>
                                            <Text style={defaultStyles.text16White}>Room No.</Text>
                                            <Text style={defaultStyles.text20Black}>A11</Text>
                                        </View>
                                        <View style={styles.verticalViewStyle}>
                                            <Text style={defaultStyles.text16White}>Capacity</Text>
                                            <Text style={defaultStyles.text20Black}>4 person</Text>
                                        </View>
                                    </View>
                                    <View style={{height: 40, justifyContent: 'center'}}>
                                        <Text style={defaultStyles.text24White}>Availability</Text>
                                    </View>
                                    <Calendar date={date} setDate={setDate} hasBookings={true}/>
                                    <EllipseButtonPrimary name={"Create  Booking"} marginTop={20}/>
                                </View>
                            </View>
                    } 
                />
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
    },
    cardStyle: {
        width: width * 0.80,
        paddingHorizontal: '3%',
        paddingVertical: '4%',
        backgroundColor: "#E75874",
        // zIndex: 1,
        // justifyContent: "center",
        // alignSelf: "center",
        alignItems: "center",
        borderRadius: 25,
        height: width * 1.05,  
        // paddingHorizontal: "5%"
    },
    horizontalViewStyle: {
        flexDirection: 'row',
        width: width * 0.7,
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    verticalViewStyle: {
        flexDirection: 'column',
        //width: width * 0.7,
        height: 40,
        //justifyContent: 'space-evenly'
    }
});