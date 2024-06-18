import { Pressable, Text, TextInput, View } from "react-native";
import styles from "../../css/style";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { SelectList } from "react-native-dropdown-select-list";


const AddQuestionScreen = () => {
    const [selected, setSelected] = React.useState("");
  
  const data = [
    {key:'1',value:'Option A'},
    {key:'2',value:'Option B'},
    {key:'3',value:'Option C'},
    {key:'4',value:'Option D'},
  ];
  
    function alert(selected: string): void {
        throw new Error("Function not implemented.");
    }

    return (
        <View style={[styles.screen,{paddingTop: 30}]}>
            <TextInput placeholder="Question" placeholderTextColor={"black"} style={[styles.inputText, {height: '20%', width:'90%', marginTop: 0}]} numberOfLines={5} multiline={true} keyboardType="twitter" scrollEnabled={true} />
            <View style={[styles.inputTextContainer]}> 
                <TextInput placeholder="Option A" placeholderTextColor={"black"} style={styles.inputText} />
                <TextInput placeholder="Option B" placeholderTextColor={"black"} style={styles.inputText} />
                <TextInput placeholder="Option C" placeholderTextColor={"black"} style={styles.inputText} />
                <TextInput placeholder="Option D" placeholderTextColor={"black"} style={styles.inputText} />
            </View>
            <View style={[styles.inputText,{padding: 0, borderWidth: 0}]}>
            <SelectList 
                placeholder="Select Correct Answer"
                searchPlaceholder="Correct Answer"
                onSelect={() => console.log(selected)}
                setSelected={setSelected} 
                data={data}  
                boxStyles={{borderRadius:50, borderWidth:0}} //override default styles
                inputStyles={{color: 'black', fontWeight: '500'}}
                
                //   defaultOption={{ key:'1', value:'Option 1' }}   //default selected option
            />
            </View>
            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>
                    Add Question
                </Text>
            </Pressable>
        </View>
    )
}

export default AddQuestionScreen;