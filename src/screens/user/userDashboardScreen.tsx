import {Pressable, Text, View} from 'react-native';
import styles from '../../css/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import {User} from '../../models/User';

const UserDashboardScreen = ({navigation}) => {
  console.log('Inside UserDashboard');
  const [user, setUser] = useState<User>();

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
  function logout() {
    AsyncStorage.removeItem('user');
    navigation.replace('Login');
  }
  return (
    <View style={styles.screen}>
      <View style={{width: '80%'}}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('UserProfile')}>
          <Text style={styles.buttonText}>My Profile</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('UserQuiz', {userId: user?.id})}>
          <Text style={styles.buttonText}>Start</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('UserReport', {userId: user?.id})}>
          <Text style={styles.buttonText}>Report</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UserDashboardScreen;
