import {Text, View} from 'react-native';
import {Question} from '../models/Question';
import styles from '../css/style';

interface questionItemProp {
  question: Question;
}
const QuestionItem = (question: questionItemProp) => {
  return (
    <View style={styles.questionReportItem}>
      <Text style={[styles.normalText, {fontSize: 18}]}>
        Question : {question.question.question}
      </Text>
      <Text style={styles.normalText}>
        Option 1 :{question.question.option1}
      </Text>
      <Text style={styles.normalText}>
        Option 2 :{question.question.option2}
      </Text>
      <Text style={styles.normalText}>
        Option 3 :{question.question.option3}
      </Text>
      <Text style={styles.normalText}>
        Option 4 :{question.question.option4}
      </Text>
      <Text style={[styles.normalText, {fontSize: 14}]}>
        Correct Option : {question.question.correct_option}
      </Text>
    </View>
  );
};

export default QuestionItem;
