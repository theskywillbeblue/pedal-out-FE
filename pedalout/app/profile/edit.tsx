import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Alert, Button } from 'react-native';
import { supabase } from '../../lib/supabase';
import { UserContext } from '../context/UserContext';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Input, Text } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditUser() {
  const { user, profile, refreshProfile } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userFullName, setUserFullName] = useState('');
  const [location, setLocation] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [userBio, setUserBio] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.username || '');
      setUserFullName(profile.full_name || '');
      setUserAge(profile.user_age?.toString() || '');
      setLocation(profile.location || '');
      setAvatarUrl(profile.avatar_img || '');
      setUserBio(profile.user_bio || '');
    }
  }, [profile]);

  async function editUserDetails() {
    if (!user) return;

    setLoading(true);

    const { error } = await supabase
      .from('user_profile')
      .update({
        username: displayName,
        full_name: userFullName,
        user_age: userAge,
        location,
        avatar_img: avatarUrl,
        user_bio: userBio,
      })
      .eq('user_id', user.id);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Details updated!');
      await refreshProfile(); // Refresh context after update
      router.back();
    }

    setLoading(false);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.text}>Edit Your Profile!</Text>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            inputStyle={styles.input}
            label="Display Name"
            leftIcon={{ type: 'font-awesome', name: 'user' }}
            onChangeText={(text) => setDisplayName(text)}
            value={displayName}
            placeholder="Username"
            textContentType="nickname"
          />
        </View>

        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            inputStyle={styles.input}
            label="Full Name"
            leftIcon={{ type: 'font-awesome', name: 'user' }}
            onChangeText={(text) => setUserFullName(text)}
            value={userFullName}
            placeholder="Your Full Name"
            autoCapitalize="words"
          />
        </View>

        <View>
          <Input
            inputStyle={styles.input}
            label="Age"
            keyboardType="numeric"
            leftIcon={{ type: 'font-awesome', name: 'hashtag' }}
            onChangeText={(text) => setUserAge(text)}
            value={userAge}
            placeholder="Your Age"
          />
        </View>

        <View style={styles.verticallySpaced}>
          <Input
            inputStyle={styles.input}
            label="Location"
            leftIcon={{ type: 'font-awesome', name: 'map-marker' }}
            onChangeText={(text) => setLocation(text)}
            value={location}
            placeholder="Where in the world?"
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            inputStyle={styles.input}
            label="User Bio"
            leftIcon={{ type: 'font-awesome', name: 'image' }}
            onChangeText={(text) => setUserBio(text)}
            value={userBio}
            placeholder="About you"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            inputStyle={styles.input}
            label="Avatar URL"
            leftIcon={{ type: 'font-awesome', name: 'image' }}
            onChangeText={(text) => setAvatarUrl(text)}
            value={avatarUrl}
            placeholder="www.coolpic.com"
            autoCapitalize="none"
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button
            title={loading ? 'Updating...' : 'Update'}
            disabled={loading}
            onPress={editUserDetails}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
    width: 200,
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 40,
    color: 'white',
  },
  input: {
    color: 'white',
  },
});
