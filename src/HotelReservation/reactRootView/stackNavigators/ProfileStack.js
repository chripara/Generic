import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreen } from "../screens/AuthScreens/AuthScreen";
import { ProfileScreen } from "../screens/ProfileScreens/ProfileScreen";
import { ManageAccountScreen } from "../screens/ProfileScreens/ManageAccountScreen";
import { ChangePasswordScreen } from "../screens/ProfileScreens/ChangePasswordScreen";
import { ChangeEmailScreen } from "../screens/ProfileScreens/ChangeEmailScreen";
import { EditProfileScreen } from "../screens/ProfileScreens/EditProfileScreen";
import { SignInScreen } from "../screens/AuthScreens/SignInScreen";

const Stack = createNativeStackNavigator();

export const ProfileStack = () => (
        <Stack.Navigator screenOptions={{ headerShown: false }}
            initialRouteName="Profile"
        >            
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{ headerVisible: false }}
            />
            <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{ headerVisible: false }}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{ headerVisible: false }}
            />  
            <Stack.Screen
                name="ChangeEmail"
                component={ChangeEmailScreen}
                options={{ headerVisible: false }}
            /> 
        </Stack.Navigator>
);
