import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import UserProvider from './context/UserContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Helvetica: require('../assets/fonts/Helvetica.ttf'),
    HelveticaRoundedBold: require('../assets/fonts/helvetica-rounded-bold.otf'),
    HelveticaBold: require('../assets/fonts/Helvetica-Bold.ttf'),
  });

  const [session, setSession] = useState<Session | null>(null);
  const [appReady, setAppReady] = useState(false);
  const router = useRouter();

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

  const segments = useSegments();

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
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaProvider>
      <UserProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <StatusBar style="auto" />
          <Stack initialRouteName="(tabs)">
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="MapScreen" />
            <Stack.Screen name="RideDetails" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </UserProvider>
    </SafeAreaProvider>
  </GestureHandlerRootView>
  
  );
}
