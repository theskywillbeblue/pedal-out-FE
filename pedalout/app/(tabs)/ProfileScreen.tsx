import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import { Button } from '@rneui/themed';
import { useContext, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from '@/app/context/UserContext';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, profile, loading } = useContext(UserContext);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign out error:', error.message);
    } else {
      router.replace('/authentication');
    }
  };

  if (loading) {
    return (
      <ThemedSafeAreaView>
        <ThemedText>Loading...</ThemedText>
      </ThemedSafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText style={styles.heading}>
          Welcome, {profile?.username || user?.email || 'Guest'}!
        </ThemedText>

        <Image
          source={{
            uri:
              profile?.avatar_img ||
              'https://cdn.pixabay.com/photo/2013/07/13/12/49/guy-160411_1280.png',
          }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>Email:</ThemedText>
            <Text>{user?.email || 'Guest'}</Text>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>Name:</ThemedText>
            <Text>{profile?.full_name || 'No name set'}</Text>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>Age:</ThemedText>
            <Text>{profile?.user_age || 'No age set'}</Text>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>Location:</ThemedText>
            <Text>{profile?.location || 'No location set'}</Text>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>Bio:</ThemedText>
            <Text>{profile?.user_bio || 'No bio made'}</Text>
          </View>
        </View>

        <Button
          title="Open Gallery"
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={() => router.push('/profile/gallery')}
        />
        <Button
          title="Edit Profile"
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={() => router.push('/profile/edit')}
        />
        <Button
          title="Sign Out"
          buttonStyle={[styles.button, styles.signOutButton]}
          titleStyle={styles.buttonText}
          onPress={handleSignOut}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    alignItems: 'center',
    padding: 10,
  },
  heading: {
    fontSize: 40,
    fontFamily: 'HelveticaRoundedBold',
    marginBottom: 20,
    lineHeight: 40,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  infoBox: {
    width: '100%',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontFamily: 'HelveticaRoundedBold',
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '90%',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#4F7942',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutButton: {
    width: '90%',
    backgroundColor: '#e63946',
  },
  buttonText: {
    textAlign: 'center',
    width: '100%',
  },
});
