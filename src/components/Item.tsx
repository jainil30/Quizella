import { Text, View } from "react-native";



export const Item = (user : User) =>{
    return (
        <View>
            <Text>{user.username}</Text>
        </View>
    );
}