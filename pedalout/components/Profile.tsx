import { UserContext } from '@/app/context/UserContext';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { useContext, useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function Profile({ navigation }: { navigation: any }) {
  const router = useRouter();
  const user = useContext(UserContext);

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchUserProfile();
    }
  }, [user]);

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
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.username}>
        {profile?.username || user?.email || 'Guest'}!
      </Text>

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
        <Text style={styles.infoText}>
          <Text style={styles.label}>Email:</Text> {user?.email || 'No email set'}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Name:</Text>{' '}
          {profile?.full_name ? `${profile.full_name}` : 'No name set'}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Age:</Text>{' '}
          {profile?.user_age || 'No age set'}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Location:</Text>{' '}
          {profile?.location || 'No location set'}
        </Text>
      </View>

      <Button
        title="Open Gallery"
        onPress={() => router.push('/your-gallery')}
        style={styles.button}
      />
      <Button
        title="Edit Profile"
        onPress={() => router.push('/edit-profile')}
      />
      <Button title="Sign Out" onPress={handleSignOut} color="#e63946" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 30,
    color: '#333',
  },
  username: {
    fontSize: 20,
    marginVertical: 10,
    color: '#555',
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  infoBox: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },
  label: {
    fontWeight: '600',
    color: '#222',
  },
  button: {
    marginTop: 10,
    width: '100%',
    borderRadius: 8,
  },
});
