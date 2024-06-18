import { FlatList, Pressable, Text, View } from "react-native";
import styles from "../../css/style";
import { useEffect, useState } from "react";


const UserDetailListScreen = ({navigation}) => {
    // const [users, setUsers] = useState();

    // const load = useEffect((){
    //     setUsers(["Jainil", "Jainil", "Jainil", "Jainil"]);
    // },[]);

    const users= ["Jainil", "Het", "Soham","Om","Jainil", "Het", "Soham","Om","Jainil", "Het", "Soham","Om"];
    return (
        <View style={styles.screen}>
            <FlatList
                data={users}
                renderItem={(item) =>
                    (
                        <Pressable style={styles.listItemBtn} onPress={() => navigation.navigate("UserDetails")}>
                <Text style={styles.listItemText}>
                    {item.item}
                </Text>
            </Pressable>
                    )
                }

                style={{ width: '100%'}}
            />
        </View>
    )
}

export default UserDetailListScreen;