import { Text, View } from "react-native";
import { useFonts } from "expo-font";
import { AuthStack } from "./reactRootView/stackNavigators/AuthStack";
import { Card } from "./reactRootView/components/Card";
import { EllipseButtonSecondary } from "./reactRootView/components/EllipseButtonSecondary";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainTabNavigator } from "./reactRootView/tabNavigators/MainTabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function HomeScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text>Home!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text>Settings!</Text>
        </View>
    );
}

function SettingsScreen2() {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabNavigator2 = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Auth" component={AuthStack} />
            <Stack.Screen name="MainTab" component={MainTabNavigator} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default function App() {


    const [fontsLoaded] = useFonts({
        "Italiana-Regular": require("./assets/fonts/Italiana-Regular.ttf"),
    });
    if (!fontsLoaded) {
        return <Text> Fonts are not loaded Successfully!!</Text>;
    } else {
        return (
            <NavigationContainer>
                <MainTabNavigator />                         
            </NavigationContainer>
        )
    }
}

