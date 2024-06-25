import {Alert, Pressable, View, Text, TextInput} from 'react-native';
import styles from '../../css/style';
import {FontAwesome} from '@expo/vector-icons';
import React, {useEffect, useState} from 'react';
import {SelectList} from 'react-native-dropdown-select-list';
import {databaseService} from '../../services/database';
import {Question} from '../../models/Question';

// Admin Can Add Questions from here
const AddQuestionScreen = ({navigation}) => {
  const [selected, setSelected] = React.useState('');

  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correct, setCorrect] = useState('');
  const [errors, setErrors] = useState([]);
  const [isOptions, setIsOptions] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (option1 && option2 && option3 && option4) {
      console.log('isOptions --- > True');
      setIsOptions(true);
      console.log('isOptions :' + isOptions);

      setData([
        {key: option1, value: option1},
        {key: option2, value: option2},
        {key: option3, value: option3},
        {key: option4, value: option4},
      ]);
    }
  }, [option1, option2, option3, option4]);

  function handleOnQuestionChange(value: string) {
    console.log(value);
    setQuestion(value);
  }
  function handleOnOption1Change(value: string) {
    setOption1(value);
  }
  function handleOnOption2Change(value: string) {
    setOption2(value);
  }
  function handleOnOption3Change(value: string) {
    setOption3(value);
  }
  function handleOnOption4Change(value: string) {
    setOption4(value);
  }
  function handleOnCorrectChange(value: string) {
    setCorrect(value);
  }

  function validateQuestion() {
    let validationErrors = [];

    if (question.length === 0) {
      validationErrors.push('Question is mandatory');
    }

    if (option1.length === 0) {
      validationErrors.push('Option 1 is mandatory');
    }

    if (option2.length === 0) {
      validationErrors.push('Option 2 is mandatory');
    }

    if (option3.length === 0) {
      validationErrors.push('Option 3 is mandatory');
    }

    if (option4.length === 0) {
      validationErrors.push('Option 4 is mandatory');
    }

    if (selected.length === 0) {
      validationErrors.push('Correct option is mandatory to select');
    }

    setErrors(validationErrors);
    return validationErrors.length === 0;
  }

  function addQuestion() {
    const isValid = validateQuestion();
    console.log('isValid : ' + isValid);
    console.log('Errors : ' + errors);
    if (isValid) {
      console.log('ENTERED IF CONDITION');
      console.log('________DATA_________');
      console.log('Question : ' + question);
      console.log('Option 1 : ' + option1);
      console.log('Option 2 : ' + option2);
      console.log('Option 3 : ' + option3);
      console.log('Option 4 : ' + option4);
      console.log('Selected : ' + selected);

      const newQuestion: Question = {
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
        correct_option: selected,
        question: question,
      };
      try {
        databaseService.createQuestion(newQuestion);
        setQuestion('');
        setCorrect('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setData([]);
        navigation.replace('AdminDashboard');
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log(errors);
    }
  }

  return (
    <View style={[styles.screen, {paddingTop: 30}]}>
      <TextInput
        placeholder="Question"
        placeholderTextColor={'black'}
        style={[styles.inputText, {height: '20%', width: '90%', marginTop: 0}]}
        numberOfLines={5}
        multiline={true}
        keyboardType="twitter"
        scrollEnabled={true}
        value={question}
        onChangeText={handleOnQuestionChange}
      />
      <View style={[styles.inputTextContainer]}>
        <TextInput
          placeholder="Option A"
          placeholderTextColor={'black'}
          style={styles.inputText}
          value={option1}
          onChangeText={handleOnOption1Change}
        />
        <TextInput
          placeholder="Option B"
          placeholderTextColor={'black'}
          style={styles.inputText}
          value={option2}
          onChangeText={handleOnOption2Change}
        />
        <TextInput
          placeholder="Option C"
          placeholderTextColor={'black'}
          style={styles.inputText}
          value={option3}
          onChangeText={handleOnOption3Change}
        />
        <TextInput
          placeholder="Option D"
          placeholderTextColor={'black'}
          style={styles.inputText}
          value={option4}
          onChangeText={handleOnOption4Change}
        />
      </View>
      <View style={[styles.inputText, {padding: 0, borderWidth: 0}]}>
        <SelectList
          placeholder="Select Correct Answer"
          searchPlaceholder="Correct Answer"
          onSelect={() => console.log(selected)}
          setSelected={setSelected}
          data={data}
          boxStyles={{borderRadius: 50, borderWidth: 0}} //override default styles
          inputStyles={{color: 'black', fontWeight: '500'}}

          //   defaultOption={{ key:'1', value:'Option 1' }}   //default selected option
        />
      </View>
      {errors.map(item => (
        <Text>{item}</Text>
      ))}
      <Pressable style={styles.button} onPress={addQuestion}>
        <Text style={styles.buttonText}>Add Question</Text>
      </Pressable>
    </View>
  );
};

export default AddQuestionScreen;
