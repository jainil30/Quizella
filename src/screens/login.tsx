import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import styles from "../css/style";

const LoginScreen = () => {
    return (
        <View style={styles.screen}>
            <Text style={[styles.title, {marginBottom: 80}] }>Login Screen</Text>
            <View style={styles.inputTextContainer}>
            <TextInput placeholder="Username" placeholderTextColor={"black"} style={styles.inputText} />
            <TextInput placeholder="Password"  placeholderTextColor={"black"} style={styles.inputText} secureTextEntry={true}/>
            </View>
            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>
                    Login
                </Text>
            </Pressable>
        </View>
    )
}

const internalStyle = StyleSheet.create({
   
   
})

export default LoginScreen;