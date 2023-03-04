import * as React from "react";
import { Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileStack } from "../stackNavigators/ProfileStack";
import { BookingStack } from "../stackNavigators/BookingStack";
import { BookingListHotelScreen } from "../screens/BookingScreens/BookingListHotelScreen";
import { BookingCreateScreen } from "../screens/BookingScreens/BookingCreateScreen";
import { BookingUpdateScreen } from "../screens/BookingScreens/BookingUpdateScreen";
import { HotelStack } from "../stackNavigators/HotelStack";
import colors from "../config/colors";

const Tab = createBottomTabNavigator();

export const BookingTabNavigator = () => (
        <Tab.Navigator 
            initialRouteName="Profile"   
            activeColor={colors.brown}
            barStyle={{ backgroundColor: colors.primary }}
            screenOptions={ () => ({                
                activeBackgroundColors: colors.brown,
                tabBarIndicatorStyle: { 
                    width: 50, 
                    height: 50, 
                    backgroundColor: colors.brown, 
                    borderRadius: 25,
                    opacity: 0.6
                },
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: { 
                    height: 60,
                    backgroundColor: colors.primary,
                    showLabel: false,
                    paddingHorizontal: '5%'
                }
            })}                         
        >
            <Tab.Screen 
                name="List"  
                component={BookingListHotelScreen}
                screenOptions={{ headerShown: false }}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Image 
                            source={require("../../assets/tabIcons/list.png")} 
                            style={{ width: 40, height: 40 }} 
                        />
                    )}
                }
            />
            <Tab.Screen 
                name="Create" 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image 
                            source={require("../../assets/tabIcons/add.png")} 
                            style={{ width: 40, height: 40 }}
                        />
                    )}
                }
                component={BookingCreateScreen}
            />
            <Tab.Screen 
                name="Update" 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image 
                            source={require("../../assets/tabIcons/update.png")} 
                            style={{ width: 40, height: 40 }} 
                        />
                    )}
                }
                component={BookingUpdateScreen}
            />         
        </Tab.Navigator>
);
