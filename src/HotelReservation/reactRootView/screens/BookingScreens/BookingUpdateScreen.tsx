import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Dimensions } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import { CalendarInput } from "../../components/CalendarInput";
import fontStyles from "../../config/StyleSheets/fontStyles";
import IUpdateBooking from "../../interfaces/Booking/IUpdateBooking";
import axiosBookingCalls from "../../axiosCalls/axiosBookingCalls";

const width = Dimensions.get('window').width;

export const BookingUpdateScreen = ({ navigation }) => {
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [hasCalendarActiveCheckInDate, setHasCalendarActiveCheckInDate] = useState(false);
    const [hasCalendarActiveCheckOutDate, setHasCalendarActiveCheckOutDate] = useState(false);

    useEffect(() => {
        setUpdateBooking(
            {
                ...updateBooking,
                ["startDate"]: checkInDate,
                ["endDate"]: checkOutDate
            })
    }, [])

    const disableAllCalendars = () => {
        setHasCalendarActiveCheckInDate(false);
        setHasCalendarActiveCheckOutDate(false);
    }
    
    const handleContent = (key: string, val) => {
        setUpdateBooking({
            ...updateBooking,
            [key]: val
        });
    }

    const handleUpdateBooking = () => {
        // setCreateBooking(
        // {
        //     ...createBooking,
        //     ["startDate"]: checkInDate,
        //     ["endDate"]: checkOutDate
        // })
        const result = axiosBookingCalls.updateBookingCall(updateBooking);
        console.log(updateBooking);
        result.then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
            console.log(error.response);
        })
    }

    const [updateBooking, setUpdateBooking] = useState<IUpdateBooking>({
        id: 202,
        room: "RoomNumber",
        firstName: "asd",
        lastName: "fasdfasdf",
        description: "asdfsdf",
        startDate: "01/01/2000",
        endDate: "02/01/2000",
        user: null
    });
    return(
        <MainScreen backgroundColor={colors.secondary}>
            <View style={styles.container}>
                <View style={styles.viewText}>
                    <Text style={fontStyles.text48White}>Bookings</Text>
                </View>
                <View style={styles.viewText}>
                    <Text style={fontStyles.text24White}>
                        Id:
                    </Text>
                    <TextInput 
                        style={fontStyles.textInput} 
                        value={updateBooking.hotelRoomId}
                        onChangeText={(value) => 
                            handleContent('id', parseInt(value))
                        }
                    />
                    <Text style={fontStyles.text24White}>
                        Hotel Room Id:
                    </Text>
                    <TextInput 
                        style={fontStyles.textInput} 
                        value={updateBooking.hotelRoomId}
                        onChangeText={(value) => 
                            handleContent('hotelRoomId', parseInt(value))
                        }
                    />
                    <Text style={fontStyles.text24White}>
                        Room:
                    </Text>
                    <TextInput 
                        style={fontStyles.textInput} 
                        value={updateBooking.room}
                        onChangeText={(value) => 
                            handleContent('room', value)
                        }
                    />
                    <Text style={fontStyles.text24White}>
                        Firstname:
                    </Text>
                    <TextInput 
                        style={fontStyles.textInput} 
                        value={updateBooking.firstname}
                        onChangeText={(value) => 
                            handleContent('firstName', value)
                        }
                    />
                    <Text style={fontStyles.text24White}>
                        Lastname:
                    </Text>
                    <TextInput 
                        style={fontStyles.textInput} 
                        value={updateBooking.lastname}
                        onChangeText={(value) => 
                            handleContent('lastName', value)
                        }
                    />
                    <Text style={fontStyles.text24White}>
                        Check In:
                    </Text>
                    <CalendarInput date={checkInDate} setDate={setCheckInDate} 
                        hasCalendarActive={hasCalendarActiveCheckInDate} 
                        setHasCalendarActive={setHasCalendarActiveCheckInDate} 
                        disableAllCalendars={disableAllCalendars}
                    />
                    <Text style={fontStyles.text24White}>
                        Check Out:
                    </Text>
                    <CalendarInput date={checkOutDate} setDate={setCheckOutDate} 
                        hasCalendarActive={hasCalendarActiveCheckOutDate} 
                        setHasCalendarActive={setHasCalendarActiveCheckOutDate} 
                        disableAllCalendars={disableAllCalendars}
                    />
                    <Text style={fontStyles.text24White}>
                        Description:
                    </Text>
                    <TextInput 
                        style={styles.textInput} 
                        multiline={true}
                        value={updateBooking.description}
                        onChangeText={(value) => 
                            handleContent('description', value)
                        }
                    />
                </View>
                <EllipseButtonPrimary
                    name={"Update Booking"}
                    onClick={() => {
                        handleUpdateBooking();                        
                        console.log('Update Booking')}}
                    marginTop={"2.5%"}
                />
            </View>
        </MainScreen>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "3%",
        height: width * 2.3
    },
    viewText: {
        position: "relative",
        marginVertical: "2%",
        paddingHorizontal: "5%",
    },
    textInput: {
        height: 180,
        textAlign: "left",
        textAlignVertical: 'top',
        fontFamily: "Italiana-Regular",
        fontSize: 20,
        backgroundColor: colors.light,
        paddingLeft: "4%",
        borderRadius: 5,
        paddingVertical: 10
    }
});
