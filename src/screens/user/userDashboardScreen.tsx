import { Pressable, Text, View } from "react-native";
import styles from "../../css/style";


const UserDashboardScreen = ({navigation}) => {
    return (
        <View style={styles.screen}>
            <View style={{width: '80%'}}>
            <Pressable style={styles.button} onPress={() => navigation.navigate("UserProfile")}>
                <Text style={styles.buttonText}>
                    My Profile
                </Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate("UserQuiz")}>
                <Text style={styles.buttonText}>
                    Start
                </Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate("UserReport")}>
                <Text style={styles.buttonText}>
                    Report
                </Text>
            </Pressable>
            </View>
      
      
        </View>
    )
}

export default UserDashboardScreen;