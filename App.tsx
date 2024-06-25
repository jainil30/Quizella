/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/login';
import AdminDashboardScreen from './src/screens/admin/adminDashboard';
import AddQuestionScreen from './src/screens/admin/addQuestionScreen';
import CreateUserScreen from './src/screens/admin/createUserScreen';
import UserDetailScreen from './src/screens/admin/userDetailsScreen';
import UserReportList from './src/screens/admin/usersReportListScreen';
import UserDashboardScreen from './src/screens/user/userDashboardScreen';
import UserMyProfileScreen from './src/screens/user/userMyProfileScreen';
import UserQuizScreen from './src/screens/user/userQuizScreen';
import AdminUserReportScreen from './src/screens/admin/adminUserReportScreen';
import UserDetailListScreen from './src/screens/admin/userDetailsListScreen';
import AdminQuestions from './src/screens/admin/adminQuestions';
import {databaseService} from './src/services/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from './src/models/User';
import UserReportScreen from './src/screens/user/userReportScreen';

const Stack = createNativeStackNavigator();

function App({}): React.JSX.Element {
  //  const [user, setUser] = useState<User>();
  useEffect(() => {
    databaseService.initDatabase();
    // getCurrentUser();
    // console.log("________________________App.tsx_______________________");
    // console.log('User : '+ user?.username);
    // if(user){
    //   console.log("WHEN USER ALREADY EXIST");
    //   if(user.role == 'admin'){
    //     navigation.push('AdminDashboard');
    //   }else{

    //     navigation.push('UserDashboard');
    //   }
    // }
  }, []);

  //   async function getCurrentUser(){
  //     try{
  //       const temp = await AsyncStorage.getItem('user');
  //       console.log(temp);
  //       const userData: User = JSON.parse(temp!) as User;
  //       // console.log(JSON.stringify(temp));
  //       console.log('TEPM : ------> '  + userData.username);
  //       setUser(userData);
  //     }catch(error){
  //       console.error(error);
  //     }

  // }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={Home} />

        {/* General Screen */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Admin Screens */}
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboardScreen}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen name="AdminAddQuestion" component={AddQuestionScreen} />
        <Stack.Screen name="AdminQuestions" component={AdminQuestions} />
        <Stack.Screen name="CreateUser" component={CreateUserScreen} />
        <Stack.Screen name="UserDetails" component={UserDetailScreen} />
        <Stack.Screen name="UserReportList" component={UserReportList} />
        <Stack.Screen
          name="UserReportAdmin"
          component={AdminUserReportScreen}
        />
        <Stack.Screen name="UserDetailsList" component={UserDetailListScreen} />

        {/* User Screens */}
        <Stack.Screen
          name="UserDashboard"
          component={UserDashboardScreen}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen name="UserProfile" component={UserMyProfileScreen} />
        <Stack.Screen name="UserQuiz" component={UserQuizScreen} />
        <Stack.Screen name="UserReport" component={UserReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={{height: '100%', padding: 16}}>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Admin Side</Text>
        <Button
          title="Admin Dashboard"
          onPress={() => navigation.navigate('AdminDashboard')}
        />

        <Button
          title="Create User"
          onPress={() => navigation.navigate('CreateUser')}
        />
        <Button
          title="User Details List"
          onPress={() => navigation.navigate('UserDetailsList')}
        />
        <Button
          title="User Details"
          onPress={() => navigation.navigate('UserDetails')}
        />
        <Button
          title="Admin Add Question"
          onPress={() => navigation.navigate('AdminAddQuestion')}
        />

        <Button
          title="User Report List"
          onPress={() => navigation.navigate('UserReportList')}
        />

        <Button
          title="User Report Admin"
          onPress={() => navigation.navigate('UserReportAdmin')}
        />
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>User Side</Text>

        <Button
          title="User Dashboard"
          onPress={() => navigation.navigate('UserDashboard')}
        />

        <Button
          title="User Profile"
          onPress={() => navigation.navigate('UserProfile')}
        />

        <Button
          title="User Quiz"
          onPress={() => navigation.navigate('UserQuiz')}
        />

        <Button
          title="User Report"
          onPress={() => navigation.navigate('UserReport')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1,
    // alignItems: 'stretch'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default App;
