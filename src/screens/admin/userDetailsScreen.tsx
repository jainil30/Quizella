import { Image, Pressable, Text, TextInput, ToastAndroid, View } from "react-native";
import styles from "../../css/style";


const UserDetailScreen = () => {
    return (
        <View style={styles.screen}>
                <Pressable onPress={() => ToastAndroid.show("Select Image", ToastAndroid.SHORT)}>
                    <View style={[styles.imageContainer]}>
                    <Image
                        style={{width: '100%',height: '100%'}}
                        resizeMode="contain"
                        source={require('../../../assets/default-profile.png')}
                    />
                    </View>
                </Pressable>

                <View style={[styles.inputTextContainer]}>
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
                    Update 
                </Text>
            </Pressable>
           
        </View>
    )
}

export default UserDetailScreen;