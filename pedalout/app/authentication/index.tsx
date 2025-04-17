import React, { useState } from 'react';
import { Alert, View, Image, StyleSheet, Text, ScrollView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Button, Input } from '@rneui/themed';
import { useRouter } from 'expo-router';

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) Alert.alert(error.message);
      setLoading(false);
    }


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>PedalOut</Text>
      <Image
        source={{
          uri: 'https://cdn.pixabay.com/photo/2013/07/13/13/39/bicycle-161315_960_720.png',
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
        inputStyle={styles.input}
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
        inputStyle={styles.input}
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
        />
      </View>
      <Button
        title="Sign in"
        onPress={signInWithEmail}
      />

            <Text style={styles.text}>Not a member yet?</Text>
      <View style={styles.verticallySpaced}>
        <Button
          style={styles.button}
          title="Sign up!"
          disabled={loading}
          onPress={() => router.push('/authentication/SignUp')}
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
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'white'
  },
  button: {
    paddingBottom: 40,
    marginBottom: 40,
  },
  input: {
    color: 'white',
  },
});
