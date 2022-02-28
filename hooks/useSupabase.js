import { useState, useEffect } from 'react';
import shallow from 'zustand/shallow';
import { useAppStore } from '../stores/app';
import {
  dbGetProfile,
  dbUpdateProfile,
  dbCreateBooking,
  dbDeleteBooking,
  dbGetMyBookings,
  dbGetAllBookings,
} from './../utils/dbHelper';
import { supabase } from './../lib/supabase';

export const useSession = () => {
  const [session, setSession] = useState(null);
  const { setUserId } = useAppStore(
    (state) => ({ setUserId: state.setUserId }),
    shallow
  );

  useEffect(() => {
    const nextSession = supabase.auth.session();
    setSession(nextSession);
    if (nextSession) {
      setUserId(nextSession.user.id);
    }

    supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (nextSession) {
        setUserId(nextSession.user.id);
      }
    });
  }, []);

  return session;
};

const useSupabase = () => {
  const { setIsLoading } = useAppStore(
    (state) => ({ setIsLoading: state.setIsLoading }),
    shallow
  );

  const getProfile = () =>
    new Promise((resolve, reject) => {
      setIsLoading(true);
      dbGetProfile()
        .then(resolve)
        .catch(reject)
        .finally(() => setIsLoading(false));
    });

  const updateProfile = ({ displayName }) =>
    new Promise((resolve, reject) => {
      setIsLoading(true);
      dbUpdateProfile({ displayName })
        .then(resolve)
        .catch(reject)
        .finally(() => setIsLoading(false));
    });

  const createBooking = ({ building, seat, date }) =>
    new Promise((resolve, reject) => {
      setIsLoading(true);
      dbCreateBooking({ building, seat, date })
        .then(resolve)
        .catch(reject)
        .finally(() => setIsLoading(false));
    });

  const deleteBooking = ({ id }) =>
    new Promise((resolve, reject) => {
      setIsLoading(true);
      dbDeleteBooking({ id })
        .then(resolve)
        .catch(reject)
        .finally(() => setIsLoading(false));
    });

  const getMyBookings = () =>
    new Promise((resolve, reject) => {
      setIsLoading(true);
      dbGetMyBookings()
        .then(resolve)
        .catch(reject)
        .finally(() => setIsLoading(false));
    });

  const getAllBookings = () =>
    new Promise((resolve, reject) => {
      setIsLoading(true);
      dbGetAllBookings()
        .then(resolve)
        .catch(reject)
        .finally(() => setIsLoading(false));
    });

  return {
    getProfile,
    updateProfile,
    createBooking,
    deleteBooking,
    getMyBookings,
    getAllBookings,
  };
};

export default useSupabase;
