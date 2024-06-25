import React, {useEffect, useState} from 'react';
import {FlatList, Text, View, Alert} from 'react-native';
import styles from '../../css/style';
import {databaseService} from '../../services/database';
import {Attempt, Question} from '../../models';

interface UserReportScreenProps {
  userId: number;
}

const UserReportScreen = ({route, navigation}) => {
  console.log('Inside User Report Screen');
  const {userId} = route.params;
  const [questions, setQuestions] = useState<
    (Question & {
      chosen_option: number;
      is_correct: boolean;
      attempt_created_at: string;
    })[]
  >([]);

  useEffect(() => {
    fetchQuestionsByUserId(userId);
  }, []);

  const fetchQuestionsByUserId = (userId: number) => {
    databaseService
      .getQuestionsByUserId(userId)
      .then(setQuestions)
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.screen}>
      {questions.length == 0 ? (
        <Text style={[styles.title, {fontSize: 20}]}>
          You have not attempted test yet
        </Text>
      ) : (
        <FlatList
          data={questions}
          renderItem={item => {
            console.log(item.item);
            return (
              <View
                style={[
                  styles.reportItemContainer,
                  {
                    backgroundColor: 'white',
                    borderColor: item.item.is_correct ? 'green' : 'red',
                    borderWidth: 3,
                    elevation: 10,
                  },
                ]}>
                <Text style={styles.normalText}>
                  Queston No. : {item.index + 1}
                </Text>
                <Text style={[styles.normalText, {fontWeight: 'bold'}]}>
                  Question : {item.item.question}
                </Text>
                <Text style={styles.normalText}>
                  Choosen Answer : {item.item.chosen_option}
                </Text>
                <Text style={styles.normalText}>
                  Correct Answer : {item.item.correct_option}
                </Text>
              </View>
            );
          }}
          style={{width: '100%'}}
        />
      )}
    </View>
  );
};

export default UserReportScreen;
