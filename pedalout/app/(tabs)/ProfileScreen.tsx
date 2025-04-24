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
        <ThemedText type='title' style={styles.heading}>
          Welcome,{'\n'}{profile?.username || user?.email || 'Guest'}!
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
            <ThemedText style={styles.labelBold}>Email: </ThemedText>
            <ThemedText style={styles.label}>{user?.email || 'Guest'}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.labelBold}>Name: </ThemedText>
            <ThemedText style={styles.label}>{profile?.full_name || 'No name set'}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.labelBold}>Age: </ThemedText>
            <ThemedText style={styles.label}>{profile?.user_age || 'No age set'}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.labelBold}>Location: </ThemedText>
            <ThemedText style={styles.label}>{profile?.location || 'No location set'}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.labelBold}>Bio: </ThemedText>
            <ThemedText style={styles.label}>{profile?.user_bio || 'No bio made'}</ThemedText>
          </View>
        </View>

{/* Gallery function to add when functionality available */}
        {/* <Button
          title="Open Gallery"
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={() => router.push('/profile/gallery')}
        /> */}

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
    
  },
  container: {
    alignItems: 'center',
    padding: 10,
  },
  heading: {
    marginBottom: 20,
    lineHeight: 40,
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#fff', 
    // Drop shadow (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // Drop shadow (Android)
    elevation: 8,
  },
  infoBox: {
    width: '90%',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
   
    borderWidth: 3,
    borderColor: '#fff', 
  },
  infoRow: {
    flexDirection: 'row',
   // fontFamily: 'Inter_400Regular',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  label: {
    fontFamily: 'Inter_400Regular',
    
    fontSize: 16,
    
  },
  labelBold: {
    fontFamily: 'Inter_400Regular',
    fontWeight: 'bold',
    fontSize: 16,
    
  },
  button: {
    width: '80%',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#4F7942',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  signOutButton: {
    width: '80%',
    backgroundColor: '#e63946',
  },
  buttonText: {
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    width: '100%',
  },
});
