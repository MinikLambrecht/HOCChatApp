// Import root functionality & ui components.
import React, { useContext } from 'react';

import { ListRenderItem, RefreshControl, View, Alert } from 'react-native';
import { Button, List, ListItem, Text, useTheme } from '@ui-kitten/components';

import Icon from 'react-native-vector-icons/Ionicons';

// Import styles.
import * as Styling from '../styles';
import { ChatModel } from '../models/Chats';

let data = new Array(5).fill({
  RoomName: 'Title',
  Description: 'Description ',
});

export default function Chats() {
  const [refreshing, setRefreshing] = React.useState(false);
  
  const theme = useTheme();
  const styles = Styling.ChatsStyles;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);


    setTimeout(() => {
      setRefreshing(false);
    }, 2000)
  }, []);

  const renderItemAccessory = () => (
    <Button size='tiny'>FOLLOW</Button>
  );

  const renderItem = ({item, index}) => (
    <ListItem
      title={item.RoomName}
      description={item.Description}
      key={index}
      accessoryRight={<Icon color={theme['color-info-500']} name='chevron-forward' />}
    />
  );

  return (
     <View style={styles.root}>
      <Text appearance='hint' category='label' style={styles.ChatsInfo}>
        Currently {data.length} Chatrooms available!
      </Text>
      <List
        data={data}
        renderItem={renderItem as unknown as ListRenderItem<any>}
        refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }/>
    </View>
  );
};