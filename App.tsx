/**
 * Grid Layout App
 * ACS 5413 — Assignment 4
 *
 * A React Native UI that mimics a grid layout: a two-column grid of app tiles
 * on the home screen, each one navigating to its own screen.
 *
 * Navigation is a native stack. The stack is what makes the navigation
 * "dynamic": there is one `Detail` route, not five, and the tile that was
 * tapped decides both the header title and the message shown. Adding a tile
 * needs no new route.
 *
 * @format
 */

import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { findAppItem } from './src/data/apps';
import DetailScreen from './src/screens/DetailScreen';
import HomeScreen from './src/screens/HomeScreen';
import { colors } from './src/theme';
import type { RootStackParamList } from './src/types';

// Typed with the route list, so `navigation.navigate` is checked at compile
// time against the routes that actually exist.
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    // SafeAreaProvider lets the navigator keep its header clear of the status
    // bar and any notch.
    <SafeAreaProvider>
      {/* Dark glyphs, because the header behind the status bar is white. */}
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          // Shared header styling for every screen in the stack. The native
          // stack draws the back arrow in this header automatically on any
          // screen pushed above the first one, which is the visible top-of-
          // screen back control.
          screenOptions={{
            headerStyle: { backgroundColor: colors.header },
            headerTitleStyle: { color: colors.text, fontWeight: '700' },
            headerTintColor: colors.accent,
            headerShadowVisible: false,
            // Android honours this as the back button's content description;
            // iOS shows it as the label beside the arrow.
            headerBackTitle: 'Home',
            contentStyle: { backgroundColor: colors.background },
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Grid Layout' }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            // The title is read from the route parameters, so all five tiles
            // share this single screen definition and each still gets its own
            // header text.
            options={({ route }) => ({
              title: findAppItem(route.params.itemId)?.label ?? 'Details',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
