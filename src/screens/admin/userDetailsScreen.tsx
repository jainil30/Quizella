import {
  Image,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import styles from '../../css/style';
import {useEffect, useState} from 'react';
import {databaseService} from '../../services/database';
import {User} from '../../models/User';
import {launchImageLibrary} from 'react-native-image-picker';

const UserDetailScreen = ({route, navigation}) => {
  const {userId} = route.params;
  const [user, setUser] = useState<User>();

  const [username, setUsername] = useState('');
  // const [userid, setUserid] = useState('');
  const [phone, setPhone] = useState(1);
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    console.log(
      '_____________________USER DETAILS SCREEN - ADMIN_____________________',
    );
    console.log('Received User ID : ' + userId);
    getUserFromId();
  }, []);

  const validateForm = () => {
    let errors = {};

    // Validate name field
    if (!username) {
      setErrors(currentErrors => [...currentErrors, 'Name is required.']);
      // errors.push('Name is required.') ;
    }

    // if (!userid) {
    //     setErrors(currentErrors => [...currentErrors, 'User Id is required.']);
    //     // errors.push('Name is required.') ;
    // }

    if (!phone) {
      setErrors(currentErrors => [
        ...currentErrors,
        'Phone Number is required.',
      ]);
      // errors.push('Name is required.') ;
    }
    // Validate password field
    if (!password) {
      setErrors(currentErrors => [...currentErrors, 'Password is required.']);
      // errors.password = 'Password is required.';
    } else if (password.length < 6) {
      setErrors(currentErrors => [
        ...currentErrors,
        'Password must be at least 6 characters.',
      ]);
      // errors.password = 'Password must be at least 6 characters.';
    }

    // Set the errors and update form validity
    // setErrors(errors);
    console.log(`errors : ${Object.keys(errors).length == 0}`);
    setIsFormValid(Object.keys(errors).length == 0);
    console.log('IsFormValid : ' + isFormValid);
  };

  function handleOnUsernameChanged(value: string) {
    setUsername(value);
  }

  // function handleOnUserIdChanged(value: string){
  //     setUserid(value);
  // }

  function handleOnPhoneNumberChanged(value: string) {
    setPhone(value);
  }

  function handleOnPasswordChanged(value: string) {
    setPassword(value);
  }

  function update() {
    // validateForm();

    // if (isFormValid) {
    console.log('Username : ' + username);
    // console.log("UserId : " + userid);
    console.log('Phone Number : ' + phone);
    console.log('Password : ' + password);

    setUsername('');
    // setUserid('');
    setPhone(0);
    setPassword('');

    databaseService.updateUser({
      username: username,
      phoneNumber: phone,
      password: password,
      role: user?.role,
      id: user?.id,
      imageUrl: imageUrl,
    });

    // Form is valid, perform the submission logic
    console.log('Form submitted successfully!');
    navigation.replace('UserDetailsList');
    // } else {

    //     // Form is invalid, display error messages
    //     console.log('Form has errors. Please correct them.');
    // }
    // setErrors([]);
  }
  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo', includeBase64: false}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setImageUrl(response.assets[0].uri);
      }
    });
  };

  async function getUserFromId() {
    try {
      const user = await databaseService.getUserById(userId);
      console.log('Obtained User : ' + user?.username);
      setUser(user);
      setUsername(user?.username);
      setPassword(user?.password);
      setPhone(user?.phoneNumber);
      setImageUrl(user?.imageUrl);
    } catch (error) {
      console.error(error);
    }
  }
  console.log('User ID : ' + user?.username);
  return (
    <View style={styles.screen}>
      {/* <Pressable onPress={pickImage}>
        <View style={[styles.imageContainer]}>
          {imageUrl && (
            <Image
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
              source={{uri: imageUrl}}
            />
          )}
        </View>
      </Pressable> */}
      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={[styles.buttonText, {fontSize: 20}]}>
          Pick an image from gallery
        </Text>
      </Pressable>
      {imageUrl && <Image source={{uri: imageUrl}} style={styles.image} />}

      <View style={[styles.inputTextContainer]}>
        <TextInput
          placeholder="Username"
          placeholderTextColor={'black'}
          style={styles.inputText}
          value={username}
          onChangeText={handleOnUsernameChanged}
        />
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor={'black'}
          style={styles.inputText}
          inputMode="tel"
          maxLength={10}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={handleOnPhoneNumberChanged}
        />
        {/* <View style={[styles.inputText, {padding: 0, margin:0, height: 'auto',backgroundColor: 'red', flexDirection: 'row'}]} >
                        <TextInput placeholder="Password"  placeholderTextColor={"black"} secureTextEntry={true} style={[styles.inputText,{elevation: 0}]}  />
                        <MaterialIcons name="house" color="#ff0000" size={20} />
                    </View> */}
        <TextInput
          placeholder="Password"
          placeholderTextColor={'black'}
          secureTextEntry={true}
          style={[styles.inputText, {elevation: 0}]}
          value={password}
          onChangeText={handleOnPasswordChanged}
        />
      </View>

      <Pressable style={styles.button} onPress={() => update()}>
        <Text style={styles.buttonText}>Update</Text>
      </Pressable>
    </View>
  );
};

export default UserDetailScreen;
