import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BookingList } from './../components';

import shallow from 'zustand/shallow';
import useSupabase from '../hooks/useSupabase';
import { useAppStore } from './../stores/app';

const MyBookings = ({ navigation }) => {
  const { getMyBookings, deleteBooking } = useSupabase();
  const [bookings, setBookings] = useState([]);
  const { isLoading } = useAppStore(
    (state) => ({ isLoading: state.isLoading }),
    shallow
  );

  useEffect(() => {
    getMyBookings().then(setBookings);
  }, []);

  const handleDeleteBooking = async (id) => {
    await deleteBooking({ id });
    getMyBookings().then(setBookings);
  };

  return (
    <View style={styles.container}>
      {/* <Text>{JSON.stringify(bookings, null, 2)}</Text> */}
      <BookingList bookings={bookings} onDelete={handleDeleteBooking} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyBookings;
