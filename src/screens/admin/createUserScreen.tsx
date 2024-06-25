import {
  Button,
  Image,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import styles from '../../css/style';
import {useEffect, useState} from 'react';
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';
import {User} from '../../models/User';
import {databaseService} from '../../services/database';
import {launchImageLibrary} from 'react-native-image-picker';

const CreateUserScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  // const [userid, setUserid] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  // useEffect(() => {

  //     // Trigger form validation when name,
  //     // email, or password changes
  //     validateForm();
  // }, [username, userid, phone ,password]);
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
    setIsFormValid(Object.keys(errors).length === 0);
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

  function createUser() {
    validateForm();
    if (isFormValid) {
      console.log('Username : ' + username);
      // console.log("UserId : " + userid);
      console.log('Phone Number : ' + phone);
      console.log('Password : ' + password);

      setUsername('');
      // setUserid('');
      setPhone('');
      setPassword('');

      const newUser: User = {
        username: username,
        phoneNumber: Number(phone),
        password: password,
        role: 'user',
        imageUrl: imageUrl,
      };

      databaseService.createUser(newUser);

      // Form is valid, perform the submission logic
      console.log('Form submitted successfully!');
      navigation.goBack();
    } else {
      // Form is invalid, display error messages
      console.log('Form has errors. Please correct them.');
    }
    // setErrors([]);
  }
  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={styles.screen}>
      {/* <Pressable onPress={pickImage}>
        <View
          style={[
            {
              backgroundColor: 'white',
              elevation: 5,
              height: 150,
              width: 150,
              marginBottom: 30,
            },
          ]}></View>
      </Pressable> */}
      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={[styles.buttonText, {fontSize: 20}]}>
          Pick an image from gallery
        </Text>
      </Pressable>
      {imageUrl && <Image source={{uri: imageUrl}} style={styles.image} />}

      <View style={styles.inputTextContainer}>
        <TextInput
          placeholder="Username"
          placeholderTextColor={'black'}
          style={styles.inputText}
          onChangeText={handleOnUsernameChanged}
          value={username}
        />
        {/* <TextInput placeholder="User Id" placeholderTextColor={"black"} style={styles.inputText} onChangeText={handleOnUserIdChanged} value={userid} /> */}
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor={'black'}
          style={styles.inputText}
          inputMode="tel"
          maxLength={10}
          keyboardType="phone-pad"
          onChangeText={handleOnPhoneNumberChanged}
          value={phone}
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
          onChangeText={handleOnPasswordChanged}
          value={password}
        />
        {/* Display error messages */}
        {Object.values(errors).map((error, index) => (
          <Text key={index} style={styles.error}>
            {error}
          </Text>
        ))}
      </View>

      <Pressable style={styles.button} onPress={() => createUser()}>
        <Text style={styles.buttonText}>Create User</Text>
      </Pressable>
    </View>
  );
};

export default CreateUserScreen;
