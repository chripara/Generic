import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, TextInput, Dimensions } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import { CalendarInput } from "../../components/CalendarInput";
import fontStyles from "../../config/StyleSheets/fontStyles";
import axiosBookingCalls from "../../axiosCalls/axiosBookingCalls";
const width = Dimensions.get('window').width;

export const BookingCreateScreen = ({ navigation }) => {
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [hasCalendarActiveCheckInDate, setHasCalendarActiveCheckInDate] = useState(false);
    const [hasCalendarActiveCheckOutDate, setHasCalendarActiveCheckOutDate] = useState(false);

    const roomRef = useRef();    
    const firstNameRef = useRef();    
    const lastNameRef = useRef();    
    const descriptionRef = useRef();  
      
    useEffect(() => {
        setCreateBooking(
            {
                ...createBooking,
                ["startDate"]: checkInDate,
                ["endDate"]: checkOutDate
            })
    }, [])

    const disableAllCalendars = () => {
        setHasCalendarActiveCheckInDate(false);
        setHasCalendarActiveCheckOutDate(false);
    }
    
    const handleContent = (key: string, val) => {
        setCreateBooking({
            ...createBooking,
            [key]: val
        });
    }

    const handleCreateBooking = () => {
        const result = axiosBookingCalls.createBookingsCall(createBooking);
        console.log(createBooking);
        result.then((response) => {
            console.log(response.data);
        })
        .catch((error) => 
            console.log(error)
        )
    }

    const [createBooking, setCreateBooking] = useState<ICreateBookingInterface>({
        room: "RoomNumber",
        firstName: "asd",
        lastName: "fasdfasdf",
        description: "asdfsdf",
        startDate: "01/01/2000",
        endDate: "02/01/2000",
        userId: 1,
        hotelRoomId: 1
    });

    return(
        <MainScreen backgroundColor={colors.secondary}>
            <View style={styles.container}>
                <View style={styles.viewText}>
                    <Text style={fontStyles.text48White}>Bookings</Text>
                </View>
                <View style={styles.viewText}>
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
                        Hotel Room Id:
                    </Text>
                    <TextInput 
                        style={fontStyles.textInput} 
                        value={createBooking.hotelRoomId}
                        onSubmitEditing={() => {roomRef.current.focus()}}
                        returnKeyType={"next"}
                        onChangeText={(value) => 
                            handleContent('hotelRoomId', parseInt(value))
                        }
                        />
                    <Text style={fontStyles.text24White}>
                        Room:
                    </Text>
                    <TextInput 
                        style={fontStyles.textInput} 
                        value={createBooking.room}
                        onSubmitEditing={() => {firstNameRef.current.focus()}}
                        returnKeyType={"next"}
                        ref={roomRef}
                        onChangeText={(value) => 
                            handleContent('room', value)
                        }
                    />
                    <Text style={fontStyles.text24White}>
                        Firstname:
                    </Text>
                    <TextInput 
                        style={fontStyles.textInput} 
                        value={createBooking.firstname}
                        onSubmitEditing={() => {lastNameRef.current.focus()}}
                        returnKeyType={"next"}
                        ref={firstNameRef}
                        onChangeText={(value) => 
                            handleContent('firstName', value)
                        }
                    />
                    <Text style={fontStyles.text24White}>
                        Lastname:
                    </Text>
                    <TextInput 
                        style={fontStyles.textInput} 
                        value={createBooking.lastname}
                        onSubmitEditing={() => {descriptionRef.current.focus()}}
                        returnKeyType={"next"}
                        ref={lastNameRef}
                        onChangeText={(value) => 
                            handleContent('lastName', value)
                        }
                    />
                    <Text style={fontStyles.text24White}>
                        Description:
                    </Text>
                    <TextInput 
                        style={styles.textInput} 
                        ref={descriptionRef}
                        multiline={true}
                        value={createBooking.description}
                        onChangeText={(value) => 
                            handleContent('description', value)
                        }
                    />
                </View>
                <EllipseButtonPrimary
                    name={"Create Booking"}
                    onClick={() => {
                        handleCreateBooking();                        
                        console.log('Create Booking')}} //navigation.navigate("ChangeEmail")}
                    marginTop={"1.5%"}
                />
            </View>
        </MainScreen>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "3%",
        height: width * 2.06
    },
    viewText: {
        position: "relative",
        marginVertical: "2%",
        paddingHorizontal: "5%",
    },
    textInput: {
        height: 140,
        textAlign: "left",
        textAlignVertical: 'top',
        fontFamily: "Italiana-Regular", 
        fontSize: 24,
        backgroundColor: colors.light,
        paddingLeft: "4%",
        paddingRight: "4%",
        borderRadius: 5,
        paddingVertical: "4%"
    }
});
