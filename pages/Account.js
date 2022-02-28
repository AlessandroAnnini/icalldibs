import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import shallow from 'zustand/shallow';
import useSupabase from '../hooks/useSupabase';
import { useAppStore } from './../stores/app';
import { supabase } from './../lib/supabase';
import { useSession } from './../hooks';

export default function Account() {
  const session = useSession();
  const [profile, setProfile] = useState({ display_name: '', is_admin: false });
  const { getProfile, updateProfile } = useSupabase();
  const { isLoading } = useAppStore(
    (state) => ({ isLoading: state.isLoading }),
    shallow
  );

  useEffect(() => {
    if (!session) return;
    getProfile().then(setProfile);
  }, [session]);

  const handleUpdateProfile = async () => {
    updateProfile({ displayName: profile.display_name });
  };

  if (!session) return <Text>loading</Text>;

  return (
    <View style={styles.view}>
      {profile.is_admin && (
        <Text style={styles.text}>Congrats, youre ADMIN</Text>
      )}
      <View>
        <Input label="email" value={session.user.email} disabled />
      </View>
      <View>
        <Input
          label="display name"
          value={profile.display_name}
          onChange={(e) =>
            setProfile({ ...profile, display_name: e.target.value })
          }
        />
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
        }}>
        <Button
          title={isLoading ? 'Loading ...' : 'Update'}
          disabled={isLoading}
          loading={isLoading}
          onPress={handleUpdateProfile}
        />

        <Button
          title={'Sign Out'}
          disabled={isLoading}
          loading={isLoading}
          onPress={() => supabase.auth.signOut()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    margin: 10,
  },
  text: {
    textAlign: 'center',
    padding: 5,
    fontSize: 26,
  },
  more: {
    marginVertical: 20,
  },
  button: {
    width: 120,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
