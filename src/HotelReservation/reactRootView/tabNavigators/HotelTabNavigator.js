import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, Image } from "react-native";
import { HotelListScreen } from "../screens/HotelScreens/HotelListScreen";
import { HotelSearchScreen } from "../screens/HotelScreens/HotelSearchScreen";
import colors from "../config/colors";

const Tab = createBottomTabNavigator();

// const 

export const HotelTabNavigator = () => {

    return(
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
            component={HotelListScreen}
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
            name="Search" 
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Image 
                        source={require("../../assets/tabIcons/search.png")} 
                        style={{ width: 40, height: 40 }}
                    />
                )}
            }
            component={HotelSearchScreen}
        />           
    </Tab.Navigator>
    )
}