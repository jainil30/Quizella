import {FlatList, Text, View} from 'react-native';
import styles from '../../css/style';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useState, useEffect} from 'react';
import {Question} from '../../models/Question';
import {databaseService} from '../../services/database';

const AdminUserReportScreen = ({route}) => {
  console.log(
    '___________________________Inside Admin Report Screen___________________________',
  );
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

  console.log('Attempted Question : ' + questions.length);
  return (
    <View style={styles.screen}>
      {questions.length == 0 ? (
        <Text style={[styles.title, {fontSize: 20}]}>
          User have not attempted test
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

export default AdminUserReportScreen;
