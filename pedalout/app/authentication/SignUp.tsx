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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Sign Up</Text>
      <Image
        source={{
          uri: 'https://cdn.pixabay.com/photo/2013/07/13/13/39/bicycle-161315_960_720.png',
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.inputContainer}>
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
      <View style={styles.inputContainer}>
        <Input
          inputStyle={styles.input}
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@emailaddress.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.inputContainer}>
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
      <Button
        title="Sign Up"
        disabled={loading}
        onPress={() => signUpWithEmail()}
        buttonStyle={styles.button}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 20,
    borderRadius: 15,
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    color: '#fff',
    paddingLeft: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 12,
    marginTop: 20,
  },
});
