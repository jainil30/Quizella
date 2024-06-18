import { FlatList, Pressable, Text, View } from "react-native";
import styles from "../../css/style";


const UserReportList = ({navigation}) => {
    const users= ["Jainil", "Het", "Soham","Om","Jainil", "Het", "Soham","Om","Jainil", "Het", "Soham","Om"];
    return (
        <View style={styles.screen}>
            <FlatList
                data={users}
                renderItem={(item) =>
                    (
                        <Pressable style={styles.listItemBtn} onPress={() => navigation.navigate("UserReport")}>
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

export default UserReportList;