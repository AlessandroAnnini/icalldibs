import format from 'date-fns/format';
import { supabase } from './../lib/supabase';

export const dbGetProfile = () =>
  new Promise(async (resolve, reject) => {
    try {
      const user = supabase.auth.user();

      const { data, error } = await supabase
        .from('profiles')
        .select('display_name, is_admin')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      resolve(data);
    } catch (error) {
      alert(error.message);
      reject(error);
    }
  });

export const dbUpdateProfile = ({ displayName }) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        display_name: displayName,
      };

      const { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal',
      });

      if (error) throw error;
      resolve();
    } catch (error) {
      alert(error.message);
      reject(error);
    }
  });

export const dbCreateBooking = ({ building, seat, date }) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = supabase.auth.user();

      const { error } = await supabase.from('bookings').insert([
        {
          user_id: user.id,
          profile: user.id,
          building,
          seat,
          date,
        },
      ]);

      if (error) throw error;
      resolve();
    } catch (error) {
      alert(error.message);
      reject(error);
    }
  });

export const dbDeleteBooking = async ({ id }) =>
  new Promise(async (resolve, reject) => {
    try {
      const { error } = await supabase.from('bookings').delete().match({ id });

      if (error) throw error;
      resolve();
    } catch (error) {
      alert(error.message);
      reject(error);
    }
  });

export const dbGetMyBookings = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const user = supabase.auth.user();

      const fromDate = format(new Date(), 'yyyy-MM-dd');

      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .filter('user_id', 'eq', user.id)
        .gte('date', fromDate)
        .order('date', { ascending: false });

      if (error) throw error;

      resolve(data);
    } catch (error) {
      alert(error.message);
      reject(error);
    }
  });

export const dbGetAllBookings = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const fromDate = format(new Date(), 'yyyy-MM-dd');

      const { data, error } = await supabase
        .from('bookings')
        .select('*, profiles(display_name)')
        .gte('date', fromDate)
        .order('date', { ascending: false });

      if (error) throw error;

      resolve(data);
    } catch (error) {
      alert(error.message);
      reject(error);
    }
  });
