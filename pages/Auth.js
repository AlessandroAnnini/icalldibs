import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { supabase } from './../lib/supabase';
import { Input } from 'react-native-elements';
import shallow from 'zustand/shallow';
import { useAppStore } from './../stores/app';
import { Button, Grid } from './../components';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');
  const { isLoading, setIsLoading, setUserId, setIsAdmin } = useAppStore(
    (state) => ({
      isLoading: state.isLoading,
      userId: state.userId,
      isAdmin: state.isAdmin,
      setIsLoading: state.isLoading,
      setUserId: state.setUserId,
      setIsAdmin: state.setIsAdmin,
    }),
    shallow
  );

  async function signInWithEmail() {
    try {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });

      if (error) throw error;
    } catch (error) {
      alert(error);
    }
  }

  async function signUpWithEmail() {
    try {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) throw error;
    } catch (error) {
      alert(error);
    }
  }

  return (
    <View style={styles.container}>
      <Grid>
        <Input
          label="Email"
          type="email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
        <Input
          label="Password"
          type="password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </Grid>
      <Grid style={{ marginTop: 40 }}>
        <Button title="Sign in" onPress={signInWithEmail} />
        <Button title="Sign up" onPress={signUpWithEmail} />
      </Grid>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
