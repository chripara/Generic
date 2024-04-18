import { EllipseButtonPrimary } from "../../components/EllipseButtonPrimary";
import { View, StyleSheet, Text } from "react-native";
import { MainScreen } from "../MainScreen";
import colors from "../../config/colors";
import fontStyles from "../../config/StyleSheets/fontStyles";

export const ManageAccountScreen = ({ navigation }) => (    
    <MainScreen backgroundColor={colors.secondary}>
        <View style={styles.container}>
            <View style={styles.viewText}>
                <Text style={fontStyles.text48White}>Manage Account</Text>                
            </View>
            <EllipseButtonPrimary
                marginTop={"10%"}
                name={"Change password"}
                onClick={() => navigation.navigate("ChangePassword")}
            />
            <EllipseButtonPrimary
                marginTop={"10%"}
                name={"Change email"}
                onClick={() => navigation.navigate("ChangeEmail")}
            />
        </View>
    </MainScreen>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "3%",
    },
    viewText: {
        position: "relative",
        marginVertical: "10%",
        paddingHorizontal: "5%",
    },
});
