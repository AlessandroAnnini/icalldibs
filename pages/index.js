import 'react-native-url-polyfill/auto';
import React from 'react';
import { useColorScheme, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from 'react-native-elements';
import { useSession } from './../hooks/useSupabase';
import { getRandomGradient } from './../utils/gradient';

import Auth from './Auth';
import Home from './Home';
import Account from './Account';
import Book from './Book';
import MyBookings from './MyBookings';
import AllBookings from './AllBookings';
import FloorPlan from './FloorPlan';
import { lightTheme, darkTheme } from './../utils/theme';
import useFont from './../hooks/useFont';

const Stack = createNativeStackNavigator();

export default function App() {
  const session = useSession();
  const isFontLoaded = useFont();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  if (!isFontLoaded) return null;

  if (session === undefined) return <Text>Loading...</Text>;

  if (session === null) {
    return (
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Auth" component={Auth} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    );
  }

  // useDark={colorScheme === 'dark'}
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'I call dibs @Nautes',
              // headerStyle: {
              //   background: getRandomGradient(),
              //   backgroundSize: '200% 100%',
              //   backgroundPosition: '100% 0',
              // },
            }}
          />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Book" component={Book} />
          <Stack.Screen
            name="MyBookings"
            component={MyBookings}
            options={{ title: 'My bookings' }}
          />
          <Stack.Screen
            name="AllBookings"
            component={AllBookings}
            options={{ title: 'All bookings' }}
          />
          <Stack.Screen
            name="FloorPlan"
            component={FloorPlan}
            options={{ title: 'Floor plan' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
