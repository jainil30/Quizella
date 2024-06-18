import { FlatList, Text, View } from "react-native";
import styles from "../../css/style";
import { Colors } from "react-native/Libraries/NewAppScreen";


const AdminUserReportScreen = () => {

    const questions = [
        {
            "attempt_id" : 1,
            "user_id" : 1, 
            "question_id" : 1,
            "choosen_option" : 1,
            "is_correct" : true,
        },
        {
            "attempt_id" : 2,
            "user_id" : 2, 
            "question_id" : 2,
            "choosen_option" : 2,
            "is_correct" : true,
        },
        {
            "attempt_id" : 3,
            "user_id" : 3, 
            "question_id" : 3,
            "choosen_option" : 3,
            "is_correct" : false,
        },
        {
            "attempt_id" : 4,
            "user_id" : 4, 
            "question_id" : 4,
            "choosen_option" : 4,
            "is_correct" : false,
        },
        {
            "attempt_id" : 5,
            "user_id" : 5, 
            "question_id" : 5,
            "choosen_option" : 5,
            "is_correct" : false,
        },
        {
            "attempt_id" : 6,
            "user_id" : 6, 
            "question_id" : 6,
            "choosen_option" : 6,
            "is_correct" : false,
        },
        {
            "attempt_id" : 7,
            "user_id" : 7, 
            "question_id" : 7,
            "choosen_option" : 7,
            "is_correct" : false,
        },
        {
            "attempt_id" : 8,
            "user_id" : 8, 
            "question_id" : 8,
            "choosen_option" : 8,
            "is_correct" : true,
        },
        {
            "attempt_id" : 9,
            "user_id" : 9, 
            "question_id" : 9,
            "choosen_option" : 9,
            "is_correct" : true,
        },
        {
            "attempt_id" : 10,
            "user_id" : 10, 
            "question_id" : 10,
            "choosen_option" : 10,
            "is_correct" : true,
        },
    ];
    return (
        <View style={styles.screen}>
            <FlatList
                data={questions}
                renderItem={(item) => {
                    return (
                        <View style={[styles.reportItemContainer, {backgroundColor: 'white', borderColor: (item.item.is_correct)? 'green' : 'red', borderWidth: 3, elevation: 10}]}>
                            <Text style={styles.normalText}>Queston No. : {item.index + 1}</Text>    
                            <Text style={styles.normalText}>{item.item.choosen_option}</Text>   
                            <Text style={styles.normalText}>{item.item.question_id}</Text>   
                            <Text style={styles.normalText}>{item.item.question_id}</Text>   
                        </View>
                    )
                }}
                style={{width:'100%'}}
                />
        </View>
    )
}

export default AdminUserReportScreen;