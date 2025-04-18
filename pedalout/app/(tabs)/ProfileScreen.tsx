import { StyleSheet, Image, Button, Text, View, ScrollView } from 'react-native';
import { useContext, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '@/app/context/UserContext';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ProfileScreen() {
  const router = useRouter();
  const user = useContext(UserContext);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (user?.id) {
  //     fetchUserProfile();
  //   }
  // }, [user]);

  const fetchUserProfile = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('user_profile')
      .select('*')
      .eq('user_id', user.id)
      .single();
    if (error) {
      console.error('Error fetching profile:', error.message);
    } else {
      setProfile(data);
    }

    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        fetchUserProfile();
      }
    }, [user?.id]),
  );

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign out error:', error.message);
    } else {
      router.replace('/authentication');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
              {/* <Button
          title="Settings"
          onPress={() => router.push('/')}
        /> */}
      <ScrollView
        // headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        // headerImage={
        //   <IconSymbol
        //     size={310}
        //     color="#808080"
        //     name="chevron.left.forwardslash.chevron.right"
        //     style={styles.headerImage}
        //   />
        // }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">
            Welcome, {profile?.username || user?.email || 'Guest'}!
          </ThemedText>
        </ThemedView>

        <Image
          source={{
            uri:
              profile?.avatar_img ||
              'https://cdn.pixabay.com/photo/2013/07/13/12/49/guy-160411_1280.png',
          }}
          style={styles.image}
          resizeMode="cover"
        />

        <ThemedView style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email: </Text>
            <Text>{user?.email || 'Guest'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name: </Text>
            <Text>{profile?.full_name || 'No name set'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Age: </Text>
            <Text>{profile?.user_age || 'No age set'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Location: </Text>
            <Text>{profile?.location || 'No location set'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Bio: </Text>
            <Text>{profile?.user_bio || 'No bio made'}</Text>
          </View>
        </ThemedView>
        <Button
          title="Open Gallery"
          onPress={() => router.push('/profile/gallery')}
        />
        <Button
          title="Edit Profile"
          onPress={() => router.push('/profile/edit')}
        />
        <Button title="Sign Out" onPress={handleSignOut} color="#e63946" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginVertical: 20,
    alignSelf: 'center',
  },
  infoBox: {
    marginVertical: 20,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    gap: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
});
