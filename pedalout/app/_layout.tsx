import { useEffect, useState } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/useColorScheme';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import UserProvider from './context/UserContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();

  const [loaded] = useFonts({
    Helvetica: require('../assets/fonts/Helvetica.ttf'),
    HelveticaRoundedBold: require('../assets/fonts/helvetica-rounded-bold.otf'),
    HelveticaBold: require('../assets/fonts/Helvetica-Bold.ttf'),
  });

  const [session, setSession] = useState<Session | null>(null);
  const [appReady, setAppReady] = useState(false);


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (loaded && session !== undefined) {
      SplashScreen.hideAsync();
      setAppReady(true);
    }
  }, [loaded, session]);


  useEffect(() => {
    if (appReady) {
      const inAuthGroup = segments[0] === 'authentication';

      if (!session && !inAuthGroup) {
        router.replace('/authentication');
      } else if (session && inAuthGroup) {
        router.replace('/(tabs)');
      }
    }
  }, [appReady, session, segments]);

  if (!appReady) return null;

  return (
    <GestureHandlerRootView>
    <SafeAreaProvider>
      <UserProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <StatusBar style="auto" />
          <Stack initialRouteName="(tabs)" screenOptions={{
        headerShown: false,
      }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="MapScreen" options={{ headerShown: false }}/>
            <Stack.Screen name="RideDetails" options={{ headerShown: false }} />
            <Stack.Screen name="FriendsProfile" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </UserProvider>
    </SafeAreaProvider>
  </GestureHandlerRootView>
  
  );
}
