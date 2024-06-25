import {Pressable, Text, View} from 'react-native';
import styles from '../../css/style';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../../models/User';

const AdminDashboardScreen = ({navigation}) => {
  console.log('Inside AdminDashboard');
  const [user, setUser] = useState<User>();

  useEffect(() => {
    console.log('Inside AdminDashboard - useEffect');
    getCurrentUser();
    console.log(
      '____________________Admin Dashboard_________________________________',
    );
    console.log('Current User : ' + user?.username);
  }, []);

  async function getCurrentUser() {
    const temp = await AsyncStorage.getItem('user');
    console.log(temp);
    const userData: User = JSON.parse(temp!) as User;
    // console.log(JSON.stringify(temp));
    console.log('TEPM : ------> ' + userData.username);
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
          onPress={() => navigation.navigate('CreateUser')}>
          <Text style={styles.buttonText}>Create User</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('UserDetailsList')}>
          <Text style={styles.buttonText}>User Details</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('AdminAddQuestion')}>
          <Text style={styles.buttonText}>Add Questions</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('AdminQuestions')}>
          <Text style={styles.buttonText}>Questions</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('UserReportList')}>
          <Text style={styles.buttonText}>Report</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AdminDashboardScreen;
