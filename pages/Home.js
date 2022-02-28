import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSession } from './../hooks';
import useSupabase from './../hooks/useSupabase';
import { useAppStore } from './../stores/app';
import shallow from 'zustand/shallow';
import images from './../utils/images';
import { PageTemplate, Grid, Button } from './../components';

const Home = ({ navigation }) => {
  const session = useSession();
  const [profile, setProfile] = useState(null);
  const { getProfile } = useSupabase();
  const { isLoading } = useAppStore(
    (state) => ({ isLoading: state.isLoading }),
    shallow
  );

  useEffect(() => {
    if (!session) return;
    getProfile().then(setProfile);
  }, [session]);

  return (
    <PageTemplate image={images.isometric.chair2}>
      <View style={styles.plantsBtns}>
        <Button
          title="Viale Minzoni"
          disabled={isLoading}
          onPress={() =>
            navigation.navigate('FloorPlan', {
              name: 'minzoni',
            })
          }
        />
        <Button
          title="Via Pellegrini"
          containerStyle={styles.clay}
          disabled={isLoading}
          onPress={() =>
            navigation.navigate('FloorPlan', {
              name: 'pellegrini',
            })
          }
        />
      </View>
      <Grid>
        <Button
          title="Go to Account"
          disabled={isLoading}
          onPress={() => navigation.navigate('Account')}
        />
        <Button
          title="Book your seat"
          containerStyle={styles.clay}
          disabled={isLoading}
          onPress={() => navigation.navigate('Book')}
        />
        <Button
          title="My bookings"
          containerStyle={styles.clay}
          disabled={isLoading}
          onPress={() => navigation.navigate('MyBookings')}
        />
        {profile && profile.is_admin && (
          <Button
            title="All bookings"
            containerStyle={styles.clay}
            disabled={isLoading}
            onPress={() => navigation.navigate('AllBookings')}
          />
        )}
      </Grid>
    </PageTemplate>
  );
};

const styles = StyleSheet.create({
  plantsBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 90,
  },
});

export default Home;
