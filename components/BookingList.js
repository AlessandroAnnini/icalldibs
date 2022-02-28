import React from 'react';
import { Platform, View, StyleSheet, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

import { BookingCard } from './BookingCard';

const BookingList = ({ bookings, onDelete }) => {
  const renderRow = ({ item }) => {
    return (
      <ListItem>
        <ListItem.Content>
          <BookingCard data={item} onDelete={onDelete} />
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={bookings}
        keyExtractor={(a) => a.id}
        renderItem={renderRow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Platform.OS !== 'web' ? '100%' : undefined,
    flex: 1,
    alignItems: 'center',
  },
  list: {
    width: '100%',
  },
});

export { BookingList };
