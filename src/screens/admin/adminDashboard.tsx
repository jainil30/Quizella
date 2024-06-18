import { Pressable, Text, View } from "react-native";
import styles from "../../css/style";


const AdminDashboardScreen = ({navigation}) => {
    return (
        <View style={styles.screen}>
            <View style={{width: '80%'}}>
            <Pressable style={styles.button} onPress={() => navigation.navigate("CreateUser")}>
                <Text style={styles.buttonText}>
                    Create User
                </Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate("UserDetailsList")}>
                <Text style={styles.buttonText}>
                    User Details
                </Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate("AdminAddQuestion")}>
                <Text style={styles.buttonText}>
                    Add Questions
                </Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate("UserReportList")}>
                <Text style={styles.buttonText}>
                    Report
                </Text>
            </Pressable>
            </View>
      
      
        </View>
    )
}

export default AdminDashboardScreen;