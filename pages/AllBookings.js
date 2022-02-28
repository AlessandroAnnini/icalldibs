import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import { BookingList } from './../components';

import shallow from 'zustand/shallow';
import useSupabase from '../hooks/useSupabase';
import { useAppStore } from './../stores/app';

const AllBookings = ({ navigation }) => {
  const { getAllBookings, deleteBooking } = useSupabase();
  const [bookings, setBookings] = useState([]);
  const { isLoading } = useAppStore(
    (state) => ({ isLoading: state.isLoading }),
    shallow
  );

  useEffect(() => {
    getAllBookings().then(setBookings);
  }, []);

  const handleDeleteBooking = async (id) => {
    await deleteBooking({ id });
    getAllBookings().then(setBookings);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text>{JSON.stringify(bookings, null, 2)}</Text> */}
      <BookingList bookings={bookings} onDelete={handleDeleteBooking} />
    </View>
  );
};

export default AllBookings;
