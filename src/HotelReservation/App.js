import { Button, Text, View } from "react-native";
import { useState } from 'react';
import { useFonts } from "expo-font";
import { AuthStack } from "./reactRootView/stackNavigators/AuthStack";
import { Card } from "./reactRootView/components/Card";
import { EllipseButtonSecondary } from "./reactRootView/components/EllipseButtonSecondary";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainTabNavigator } from "./reactRootView/tabNavigators/MainTabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Calendar } from "./reactRootView/components/Calendar";
import { CalendarInput } from "./reactRootView/components/CalendarInput";

// function HomeScreen() {
//     return (
//         <View
//             style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//         >
//             <Text>Home!</Text>
//         </View>
//     );
// }

// function SettingsScreen() {
//     return (
//         <View
//             style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//         >
//             <Text>Settings!</Text>
//         </View>
//     );
// }

// function SettingsScreen2() {
//     return (
//         <View
//             style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//         >
//             <Text>Settings!</Text>
//         </View>
//     );
// }

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// const MainTabNavigator2 = () => (
//     <NavigationContainer>
//         <Stack.Navigator>
//             <Stack.Screen name="Auth" component={AuthStack} />
//             <Stack.Screen name="MainTab" component={MainTabNavigator} />
//         </Stack.Navigator>
//     </NavigationContainer>
// );

export default function App() {

    const [date, setDate] = useState(new Date());
    const counter22 = 0;
    var tempDate = new Date();

    const [fontsLoaded] = useFonts({
        "Italiana-Regular": require("./assets/fonts/Italiana-Regular.ttf"),
    });
    if (!fontsLoaded) {
        return <Text> Fonts are not loaded Successfully!!</Text>;
    } else {

        return (
            <View style={{ alignItems: 'center', marginTop: 100 }}>
                <Calendar date={date} setDate={setDate} />
                <Text>{date.toString()}</Text>
            </View>
            // <NavigationContainer>
            //     <MainTabNavigator />                         
            // </NavigationContainer>
        )
    }
}


// const [date, setDate] = useState(new Date());
// const tempDate = date;
// tempDate.setDate(1);
// setDate(tempDate);
//     return (
//         <View style={{ alignItems: 'center', marginTop: 100 }}>
//             <Text>{tempDate}</Text>
//             <Button onPress={() => {
//                 //stempDate.setFullYear(date.getFullYear()+1); 
//                 setDate(tempDate)
//                 }} 
//                 title={"asdfsasdf"}/>
//         </View>
//         // <NavigationContainer>
//         //     <MainTabNavigator />                         
//         // </NavigationContainer>
//     )
