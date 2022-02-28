import React, { useEffect, useState } from 'react';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';

import shallow from 'zustand/shallow';
import useSupabase from '../hooks/useSupabase';
import { useAppStore } from './../stores/app';
import { buildings, seats } from './../utils/constants';
import { PageTemplate, Button, Calendar, Select, Grid } from './../components';

const minDate = new Date();
const maxDate = addDays(new Date(), 7);
const baseBooking = {
  date: format(minDate, 'yyyy-MM-dd'),
  building: '',
  seat: '',
  isTaken: false,
  isTakenByMe: false,
};

const Book = ({ navigation }) => {
  const { getAllBookings, createBooking } = useSupabase();
  const [allBookings, setAllBookings] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(baseBooking);

  const resetBooking = () => {
    setCurrentBooking(baseBooking);
  };

  const { userId, isLoading } = useAppStore(
    (state) => ({ userId: state.userId, isLoading: state.isLoading }),
    shallow
  );

  useEffect(() => {
    getAllBookings().then(setAllBookings);
  }, []);

  const checkAvailability = (currbook) => {
    const { date, building, seat } = currbook;
    const isTaken = allBookings.find(
      (b) => b.date === date && b.building === building && b.seat === seat
    );

    setCurrentBooking({
      ...currbook,
      isTaken: !!isTaken,
      isTakenByMe: isTaken ? isTaken.user_id === userId : false,
    });
  };

  const handleConfirm = (date) => {
    const nextCurrentBooking = { ...currentBooking, date };
    setCurrentBooking(nextCurrentBooking);
    checkAvailability(nextCurrentBooking);
  };

  const handleCreateBooking = async () => {
    await createBooking(currentBooking);
    resetBooking();
    getAllBookings().then(setAllBookings);
  };

  const calculateIsButtonDisabled = () => {
    const { date, building, seat, isTaken, isTakenByMe } = currentBooking;
    return isLoading || !date || !building || !seat || isTaken || isTakenByMe;
  };

  return (
    <PageTemplate isRandomImage>
      <Calendar
        minDate={minDate}
        maxDate={maxDate}
        onChange={handleConfirm}
        value={currentBooking.date}
      />

      <Grid>
        <Select
          value={currentBooking.building}
          onValueChange={(building) => {
            const nextCurrentBooking = { ...currentBooking, building };
            setCurrentBooking(nextCurrentBooking);
            checkAvailability(nextCurrentBooking);
          }}
          placeholder={{ label: 'Select building', value: null }}
          items={buildings}
        />
        {currentBooking.building ? (
          <Select
            value={currentBooking.seat}
            onValueChange={(seat) => {
              const nextCurrentBooking = { ...currentBooking, seat };
              setCurrentBooking(nextCurrentBooking);
              checkAvailability(nextCurrentBooking);
            }}
            placeholder={{ label: 'Select seat', value: null }}
            items={seats[currentBooking.building]}
          />
        ) : null}
      </Grid>

      <Button
        title={'Book'}
        disabled={calculateIsButtonDisabled()}
        loading={isLoading}
        onPress={handleCreateBooking}
      />
    </PageTemplate>
  );
};

export default Book;
