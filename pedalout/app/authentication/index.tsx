import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import { Input, Button } from '@rneui/themed';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Auth() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ThemedText style={styles.heading}>PedalOut</ThemedText>

        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2013/07/13/13/39/bicycle-161315_960_720.png',
          }}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.inputWrapper}>
          <Input
            inputStyle={styles.input}
            label="Email"
            placeholder="email@emailaddress.com"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
          />
          <Input
            inputStyle={styles.input}
            label="Password"
            placeholder="Password"
            secureTextEntry
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={setPassword}
            value={password}
            autoCapitalize="none"
          />
        </View>

        <Button
          title="Sign In"
          onPress={signInWithEmail}
          loading={loading}
          buttonStyle={styles.signInButton}
          titleStyle={{ color: colorScheme === 'dark' ? '#fff' : '#333' }}
        />

        <ThemedText style={styles.subtext}>Not a member yet?</ThemedText>

        <Button
          title="Sign up!"
          onPress={() => router.push('/authentication/SignUp')}
          buttonStyle={styles.signUpButton}
          titleStyle={{ color: colorScheme === 'dark' ? '#fff' : '#333' }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 10,
    alignItems: 'center',
  },
  heading: {
    fontSize: 40, 
    fontFamily: 'HelveticaRoundedBold',
    marginBottom: 20, 
  },
  image: {
    width: 300,
    height: 180,
    marginBottom: 30,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    fontFamily: 'HelveticaRoundedBold',
    fontSize: 16,
    color: '#fff',
  },
  signInButton: {
    width: '100%',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#4F7942',
    marginBottom: 20,
  },
  signUpButton: {
    width: '100%',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#4F7942',
  },
  subtext: {
    marginVertical: 12,
    paddingTop: 5,
    fontSize: 16,
    color: 'gray',
    fontFamily: 'HelveticaRoundedBold',
  },
});
