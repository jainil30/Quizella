import { Pressable, Text, TextInput, View } from "react-native";
import styles from "../../css/style";
import React, { useMemo, useState } from "react";
import { RadioButton, RadioButtonProps, RadioGroup } from "react-native-radio-buttons-group";
import { Colors } from "react-native/Libraries/NewAppScreen";


const UserQuizScreen = () => {

    const questions = [
        {
            "id" : 1,
            "question" : "How are you?",
            "option1" : "A",
            "option2" : "B",
            "option3" : "C",
            "option4" : "D",
            "correctOption" : "option1",
            "createdAt" : "12-12-12",
            "updatedAt" : "12-12-12"
        },
        {
            "id" : 2,
            "question" : "How are you?",
            "option1" : "A",
            "option2" : "B",
            "option3" : "C",
            "option4" : "D",
            "correctOption" : "option1",
            "createdAt" : "12-12-12",
            "updatedAt" : "12-12-12"
        },
        {
            "id" : 3,
            "question" : "How are you?",
            "option1" : "A",
            "option2" : "B",
            "option3" : "C",
            "option4" : "D",
            "correctOption" : "option1",
            "createdAt" : "12-12-12",
            "updatedAt" : "12-12-12"
        },
        {
            "id" : 4,
            "question" : "How are you?",
            "option1" : "A",
            "option2" : "B",
            "option3" : "C",
            "option4" : "D",
            "correctOption" : "option1",
            "createdAt" : "12-12-12",
            "updatedAt" : "12-12-12"
        },
        {
            "id" : 5,
            "question" : "How are you?",
            "option1" : "A",
            "option2" : "B",
            "option3" : "C",
            "option4" : "D",
            "correctOption" : "option1",
            "createdAt" : "12-12-12",
            "updatedAt" : "12-12-12"
        },
        {
            "id" : 6,
            "question" : "How are you?",
            "option1" : "A",
            "option2" : "B",
            "option3" : "C",
            "option4" : "D",
            "correctOption" : "option1",
            "createdAt" : "12-12-12",
            "updatedAt" : "12-12-12"
        },
        {
            "id" : 7,
            "question" : "How are you?",
            "option1" : "A",
            "option2" : "B",
            "option3" : "C",
            "option4" : "D",
            "correctOption" : "option1",
            "createdAt" : "12-12-12",
            "updatedAt" : "12-12-12"
        },
        {
            "id" : 8,
            "question" : "How are you?",
            "option1" : "A",
            "option2" : "B",
            "option3" : "C",
            "option4" : "D",
            "correctOption" : "option1",
            "createdAt" : "12-12-12",
            "updatedAt" : "12-12-12"
        },
        {
            "id" : 9,
            "question" : "How are you?",
            "option1" : "A",
            "option2" : "B",
            "option3" : "C",
            "option4" : "D",
            "correctOption" : "option1",
            "createdAt" : "12-12-12",
            "updatedAt" : "12-12-12"
        },
        {
            "id" : 10,
            "question" : "How are you?",
            "option1" : "A",
            "option2" : "B",
            "option3" : "C",
            "option4" : "D",
            "correctOption" : "option1",
            "createdAt" : "12-12-12",
            "updatedAt" : "12-12-12"
        },
    ];

    const radioButtons: RadioButtonProps[] = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: questions[0].option1,
            value: questions[0].option1,
            color: "#004643",
            labelStyle: styles.radioButtonLabelStyle,
            containerStyle : styles.radioButtonContainerStyle
            
        },
        {
            id: '2',
            label: questions[0].option2,
            value: questions[0].option2,
            color: "#004643",
            labelStyle: styles.radioButtonLabelStyle,
            containerStyle : styles.radioButtonContainerStyle
        },
        {
            id: '3',
            label: questions[0].option3,
            value: questions[0].option3,
            color: "#004643",
            labelStyle: styles.radioButtonLabelStyle,
            containerStyle : styles.radioButtonContainerStyle
            
        },
        {
            id: '4',
            label: questions[0].option4,
            value: questions[0].option4,
            color: "#004643",
            labelStyle: styles.radioButtonLabelStyle,
            containerStyle : styles.radioButtonContainerStyle
        }
    ]), []);

    const [selectedId, setSelectedId] = useState<string | undefined>();

    return (
        <View style={styles.screen}>
            <TextInput placeholder={"questions[0]"} placeholderTextColor={"black"} style={[styles.inputText, {height: '20%', width:'90%', marginTop: 0}]} numberOfLines={5} multiline={true} keyboardType="twitter" scrollEnabled={true} editable={false} > {questions[0].question}</TextInput>
            <RadioGroup 
                 labelStyle={{backgroundColor: 'white'}}
                radioButtons={radioButtons} 
                onPress={setSelectedId}
                selectedId={selectedId}
            />
            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>
                    Next
                </Text>
            </Pressable>
        </View>
    )
}

export default UserQuizScreen;