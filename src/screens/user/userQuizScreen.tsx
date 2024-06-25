import {Pressable, Text, TextInput, View} from 'react-native';
import styles from '../../css/style';
import React, {useEffect, useMemo, useState} from 'react';
import {
  RadioButton,
  RadioButtonProps,
  RadioGroup,
} from 'react-native-radio-buttons-group';
import {useNavigation} from '@react-navigation/native';
import {databaseService} from '../../services/database';

const UserQuizScreen = ({route}) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const navigation = useNavigation();

  const {userId} = route.params;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await databaseService.getAllQuestions();
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error('Error fetching questions from database: ', error);
      }
    };

    fetchQuestions();
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (id: string) => {
    setSelectedId(id);
    const selectedOption = radioButtons.find(button => button.id === id)?.value;
    if (selectedOption) {
      const correct = selectedOption == currentQuestion.correct_option;
      console.log(
        `Selected: ${selectedOption}, Correct: ${currentQuestion.correct_option}`,
      );
      setIsCorrect(correct);
    }
  };

  const radioButtons: RadioButtonProps[] = useMemo(
    () =>
      currentQuestion
        ? [
            {
              id: '1',
              label: currentQuestion.option1,
              value: currentQuestion.option1,
              color: '#004643',
              labelStyle: styles.radioButtonLabelStyle,
              containerStyle: [
                styles.radioButtonContainerStyle,
                selectedId === '1' && {
                  borderColor:
                    selectedId === '1' && isCorrect === true ? 'green' : 'red',
                  borderWidth: 2,
                },
              ],
              disabled: selectedId !== undefined,
            },
            {
              id: '2',
              label: currentQuestion.option2,
              value: currentQuestion.option2,
              color: '#004643',
              labelStyle: styles.radioButtonLabelStyle,
              containerStyle: [
                styles.radioButtonContainerStyle,
                selectedId === '2' && {
                  borderColor:
                    selectedId === '2' && isCorrect === true ? 'green' : 'red',
                  borderWidth: 2,
                },
              ],
              disabled: selectedId !== undefined,
            },
            {
              id: '3',
              label: currentQuestion.option3,
              value: currentQuestion.option3,
              color: '#004643',
              labelStyle: styles.radioButtonLabelStyle,
              containerStyle: [
                styles.radioButtonContainerStyle,
                selectedId === '3' && {
                  borderColor:
                    selectedId === '3' && isCorrect === true ? 'green' : 'red',
                  borderWidth: 2,
                },
              ],
              disabled: selectedId !== undefined,
            },
            {
              id: '4',
              label: currentQuestion.option4,
              value: currentQuestion.option4,
              color: '#004643',
              labelStyle: styles.radioButtonLabelStyle,
              containerStyle: [
                styles.radioButtonContainerStyle,
                selectedId === '4' && {
                  borderColor:
                    selectedId === '4' && isCorrect === true ? 'green' : 'red',
                  borderWidth: 2,
                },
              ],
              disabled: selectedId !== undefined,
            },
          ]
        : [],
    [currentQuestion, selectedId, isCorrect],
  );

  const handleNextPress = async () => {
    const selectedOption = radioButtons.find(
      button => button.id === selectedId,
    )?.value;
    console.log('User ID : ' + userId);
    // Save the attempt to the database
    try {
      await databaseService.createAttempt({
        user_id: userId,
        question_id: currentQuestion.questionId,
        chosen_option: selectedOption,
        is_correct: isCorrect,
      });
    } catch (error) {
      console.error('Error inserting attempt into database: ', error);
    }

    setSelectedId(undefined); // Reset the selected option
    setIsCorrect(null); // Reset the correctness state
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate('UserDashboard'); // Navigate to UserDashboard when the quiz is finished
    }
  };

  if (!currentQuestion) {
    return <Text>Loading...</Text>; // Optionally render a loading indicator
  }

  return (
    <View style={[styles.screen]}>
      <TextInput
        placeholder={'Question'}
        placeholderTextColor={'black'}
        style={[styles.inputText, {height: '20%', width: '90%', marginTop: 0}]}
        numberOfLines={5}
        multiline={true}
        keyboardType="twitter"
        scrollEnabled={true}
        editable={false}
        value={currentQuestion.question}
      />
      <RadioGroup
        labelStyle={{backgroundColor: 'white'}}
        radioButtons={radioButtons}
        onPress={handleOptionSelect}
        selectedId={selectedId}
      />
      <Pressable
        style={[styles.button, selectedId ? {} : {opacity: 0.5}]}
        onPress={handleNextPress}
        disabled={!selectedId}>
        <Text style={styles.buttonText}>
          {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
        </Text>
      </Pressable>
    </View>
  );
};

export default UserQuizScreen;
