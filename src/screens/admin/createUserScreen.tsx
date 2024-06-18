import { Pressable, Text, TextInput, ToastAndroid, View } from "react-native";
import styles from "../../css/style";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";


const CreateUserScreen = () => {
      
    // State variable to hold the password 
    const [password, setPassword] = useState(''); 
  
    // State variable to track password visibility 
    const [showPassword, setShowPassword] = useState(false); 
  
    // Function to toggle the password visibility state 
    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    }; 
    return (
        <View style={styles.screen}>
                <Pressable onPress={() => ToastAndroid.show("Select Image", ToastAndroid.SHORT)}>
                    <View style={[{backgroundColor: 'white', elevation: 5, height: 150,width:150, marginBottom: 30}]}>
                    </View>
                </Pressable>

                <View style={styles.inputTextContainer}>
                    <TextInput placeholder="Username" placeholderTextColor={"black"} style={styles.inputText} />
                    <TextInput placeholder="User Id" placeholderTextColor={"black"} style={styles.inputText} />
                    <TextInput placeholder="Phone Number" placeholderTextColor={"black"} style={styles.inputText} inputMode="tel" maxLength={10} keyboardType="phone-pad" />
                    {/* <View style={[styles.inputText, {padding: 0, margin:0, height: 'auto',backgroundColor: 'red', flexDirection: 'row'}]} >
                        <TextInput placeholder="Password"  placeholderTextColor={"black"} secureTextEntry={true} style={[styles.inputText,{elevation: 0}]}  />
                        <MaterialIcons name="house" color="#ff0000" size={20} />
                    </View> */}
                    <TextInput placeholder="Password"  placeholderTextColor={"black"} secureTextEntry={true} style={[styles.inputText,{elevation: 0}]}/>

                </View>

                <Pressable style={styles.button}>
                <Text style={styles.buttonText}>
                    Create User
                </Text>
            </Pressable>
           
        </View>
    )
}

export default CreateUserScreen;