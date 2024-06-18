import { TextInput } from "react-native"
import styles from "../css/style"
import React from "react";


const PasswordField = (props) =>{
    const [secure, setSecure] = React.useState(props.secure);
    return (
        <TextInput
setFocus={focus}
onChangeText={text => props.onChangeText(text)}
onFocus={() => setFocus(true)}
onBlur={() => setFocus(false)}
secureTextEntry={secure} //we just added this
style=
{styles.textInput}
placeholder={props.placeholder} />
    )
}