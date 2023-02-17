import { Text } from "react-native";
import { useFonts } from "expo-font";
import { AuthStack } from "./reactRootView/stackNavigators/AuthStack";

export default function App() {
    const [fontsLoaded] = useFonts({
        "Italiana-Regular": require("./assets/fonts/Italiana-Regular.ttf"),
    });
    if (!fontsLoaded) {
        return <Text> Fonts are not loaded Successfully!!</Text>;
    } else {
        return <AuthStack />
    }
}