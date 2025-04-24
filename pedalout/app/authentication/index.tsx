import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  View,
  useColorScheme,
  Platform,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Input, Button } from '@rneui/themed';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { ThemedText } from '@/components/ThemedText';
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
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 45 : 0}
    >
      <ScrollView contentContainerStyle={ styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image
            source={require('../../assets/images/PedalOutMainLogoWhite.png')}
            style={styles.image}
            resizeMode="contain"
          />

          <View style={styles.inputWrapper}>
            <Input
              inputStyle={styles.input}
              label="Email"
              placeholder="email@address.com"
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
            titleStyle={{
              color: colorScheme === 'dark' ? '#fff' : '#333',
              textAlign: 'center',
              width: '100%',
            }}
          />

          <ThemedText style={styles.subtext}>Not a member yet?</ThemedText>

          <Button
            title="Sign up!"
            onPress={() => router.push('/authentication/SignUp')}
            buttonStyle={styles.signUpButton}
            titleStyle={{
              color: colorScheme === 'dark' ? '#fff' : '#333',
              textAlign: 'center',
              width: '100%',
            }}
          />
        </View>
      </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 40,
    fontFamily: 'HelveticaRoundedBold',
    marginBottom: 20,
    lineHeight: 40,
  },
  image: {
    width: '90%',
    aspectRatio: 1,
    maxHeight: 350,
    marginBottom: 5,
    alignSelf: 'center',
  },
  inputWrapper: {
    width: '95%',
    marginBottom: 20,
  },
  input: {
    fontFamily: 'HelveticaRoundedBold',
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  signInButton: {
    width: '80%',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#4F7942',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  signUpButton: {
    width: '80%',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#4F7942',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  subtext: {
    marginVertical: 12,
    paddingTop: 5,
    fontSize: 16,
    color: 'gray',
    fontFamily: 'HelveticaRoundedBold',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  keyboard: {
    flex: 1,
  },
});
