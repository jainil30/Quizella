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

const UserDetailListScreen = ({navigation}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    console.log(
      '_________ ________________USER DETAILS LIST - ADMIN SIDE_________________________',
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
                navigation.replace('UserDetails', {userId: item.item.id})
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

export default UserDetailListScreen;
