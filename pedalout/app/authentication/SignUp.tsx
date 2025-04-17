import React, { useState } from 'react';
import { Alert, View, Image, StyleSheet, Text, ScrollView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Button, Input } from '@rneui/themed';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState('');

  async function signUpWithEmail() {
    setLoading(true);

    const {
      data: { session, user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }

    if (!session) {
      Alert.alert('Please check your inbox for email verification!');
      setLoading(false);
      return;
    }

    const userId = session.user.id;

    const { error: profileError } = await supabase.from('user_profile').insert([
      {
        user_id: userId,
        user_email: email,
        username: displayName,
      },
    ]);

    if (profileError) {
      Alert.alert('Profile creation failed', profileError.message);
    } else {
      Alert.alert('Signup successful!');
    }

    setLoading(false);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Sign In!</Text>
      <Image
        source={{
          uri: 'https://cdn.pixabay.com/photo/2013/07/13/14/05/mountain-bike-162109_1280.png',
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          inputStyle={styles.input}
          label="Display Name"
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          onChangeText={setDisplayName}
          value={displayName}
          placeholder="Username"
          textContentType="nickname"
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          inputStyle={styles.input}
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          inputStyle={styles.input}
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  image: {
    width: 400,
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 40,
  },
  input: {
    color: 'white',
  },
});
