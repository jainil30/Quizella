import {
  Image,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import styles from '../../css/style';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../../models/User';

const UserMyProfileScreen = () => {
  console.log('Inside UserDashboard');
  const [user, setUser] = useState<User>();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    console.log('Inside UserDashboard - useEffect');
    getCurrentUser();
    console.log(
      '____________________User Dashboard_________________________________',
    );
    console.log('Current User : ' + user?.username);
  }, []);

  async function getCurrentUser() {
    const temp = await AsyncStorage.getItem('user');
    console.log(temp);
    const userData: User = JSON.parse(temp!) as User;
    // console.log(JSON.stringify(temp));
    console.log('TEMP : ------> ' + userData.username);
    setUser(userData);
  }

  return (
    <View style={styles.screen}>
      <View style={[styles.imageContainer]}>
        <Image
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
          source={
            user?.imageUrl
              ? {uri: user.imageUrl}
              : require('../../../assets/default-profile.png')
          }
        />
      </View>

      <View style={styles.inputTextContainer}>
        <Text style={styles.inputText}>Username : {user?.username}</Text>
        <Text style={styles.inputText}>User Id : {user?.id}</Text>
        <Text style={styles.inputText}>Phone Number : {user?.phoneNumber}</Text>
        {/* <View style={[styles.inputText, {padding: 0, margin:0, height: 'auto',backgroundColor: 'red', flexDirection: 'row'}]} >
                        <TextInput placeholder="Password"  placeholderTextColor={"black"} secureTextEntry={true} style={[styles.inputText,{elevation: 0}]}  />
                        <MaterialIcons name="house" color="#ff0000" size={20} />
                    </View> */}
      </View>
    </View>
  );
};

export default UserMyProfileScreen;
