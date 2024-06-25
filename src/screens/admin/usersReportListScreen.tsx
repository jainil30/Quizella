import {FlatList, Pressable, Text, View} from 'react-native';
import styles from '../../css/style';
import {useState, useEffect} from 'react';
import {User} from '../../models/User';
import {databaseService} from '../../services/database';

const UserReportList = ({navigation}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    console.log(
      '_________________________USER DETAILS LIST - ADMIN SIDE_________________________',
    );
    getAllUser();
  }, []);

  async function getAllUser() {
    try {
      const tempUsers = await databaseService.getAllUsers();
      console.log(typeof tempUsers);
      console.log(tempUsers.length);
      setUsers(tempUsers);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <View style={styles.screen}>
      {users.length == 0 ? (
        <Text style={styles.title}>No Users Available</Text>
      ) : (
        <FlatList
          data={users}
          renderItem={item => (
            <Pressable
              style={styles.listItemBtn}
              onPress={() =>
                navigation.navigate('UserReportAdmin', {userId: item.item.id})
              }>
              <Text style={styles.listItemText}>{item.item.username}</Text>
            </Pressable>
          )}
          style={{width: '100%'}}
        />
      )}
    </View>
  );
};

export default UserReportList;
