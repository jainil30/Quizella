import { Image, Pressable, Text, TextInput, ToastAndroid, View } from "react-native";
import styles from "../../css/style";
import React from "react";


const UserMyProfileScreen = () => {
    return (
        <View style={styles.screen}>
                 
                    <View style={[styles.imageContainer]}>
                    <Image
                        style={{width: '100%',height: '100%'}}
                        resizeMode="contain"
                        source={require('../../../assets/default-profile.png')}
                    />
                    </View>

                <View style={styles.inputTextContainer}>
                    <Text  style={styles.inputText}>Username : </Text>
                    <Text  style={styles.inputText} >User Id : </Text>
                    <Text  style={styles.inputText} >Phone Number : </Text>
                    <Text  style={styles.inputText} >Password : </Text>
                    {/* <View style={[styles.inputText, {padding: 0, margin:0, height: 'auto',backgroundColor: 'red', flexDirection: 'row'}]} >
                        <TextInput placeholder="Password"  placeholderTextColor={"black"} secureTextEntry={true} style={[styles.inputText,{elevation: 0}]}  />
                        <MaterialIcons name="house" color="#ff0000" size={20} />
                    </View> */}

                </View>

           
        </View>
    )
}

export default UserMyProfileScreen;