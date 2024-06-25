import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import styles from '../css/style';
import {useState} from 'react';
import {User} from '../models/User';
import {databaseService} from '../services/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleOnUsernameChanged(value: string) {
    setUsername(value);
  }
  function handleOnPasswordChanged(value: string) {
    setPassword(value);
  }

  async function login() {
    const user = await databaseService.getUserByUsername(username);
    console.log(user);
    if (user && user.username == username && user.password == password) {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
        console.log('______________________________________');
        console.log(user);
        if (user.role == 'admin') {
          navigation.replace('AdminDashboard');
        } else {
          navigation.replace('UserDashboard');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Invalid Credentials');
    }
  }

  return (
    <View style={styles.screen}>
      <Text style={[styles.title, {marginBottom: 80}]}>Login Screen</Text>
      <View style={styles.inputTextContainer}>
        <TextInput
          placeholder="Username"
          placeholderTextColor={'black'}
          style={styles.inputText}
          value={username}
          onChangeText={handleOnUsernameChanged}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={'black'}
          style={styles.inputText}
          secureTextEntry={true}
          value={password}
          onChangeText={handleOnPasswordChanged}
        />
      </View>
      <Pressable style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
