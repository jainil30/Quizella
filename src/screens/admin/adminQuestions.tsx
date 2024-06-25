import {
  DrawerLayoutAndroid,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';
import styles from '../../css/style';
import {useEffect, useState} from 'react';
import {databaseService} from '../../services/database';
import {User} from '../../models/User';
import {Item} from '../../components/Item';
import {Question} from '../../models/Question';
import QuestionItem from '../../components/questionItem';

const AdminQuestions = ({navigation}) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    console.log(
      '_________ ________________USER DETAILS LIST - ADMIN SIDE_________________________',
    );
    getAllQuestion();
  }, []);

  async function getAllQuestion() {
    try {
      const tempquestions = await databaseService.getAllQuestions();
      console.log(typeof tempquestions);
      console.log(tempquestions.length);
      setQuestions(tempquestions);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <View style={styles.screen}>
      {questions.length == 0 ? (
        <Text style={styles.title}>No Questions Avalable</Text>
      ) : (
        <FlatList
          data={questions}
          renderItem={item => <QuestionItem question={item.item} />}
          style={{width: '100%'}}
        />
      )}
    </View>
  );
};

export default AdminQuestions;
