import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  ImageBackground,
  Platform,
  StatusBar,
} from 'react-native';
import { Button } from '@rneui/themed';
import { useContext } from 'react';
import { UserContext } from '@/app/context/UserContext';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, profile, loading } = useContext(UserContext);
  const colorScheme = useColorScheme();

  const borderColor = useThemeColor({ light: '#ccc', dark: '#444' });
  const backgroundColor = colorScheme === 'dark' ? '#000' : '#fff';
  const textColor = colorScheme === 'dark' ? '#fff' : '#000';

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
      <SafeAreaView style={styles.loadingContainer}>
        <ThemedText>Loading...</ThemedText>
      </SafeAreaView>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/ProfileBackgroundWhiteLow.png')}
      style={styles.background}
      imageStyle={{ opacity: 0.3 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Image
            source={{
              uri:
                profile?.avatar_img ||
                'https://cdn.pixabay.com/photo/2013/07/13/12/49/guy-160411_1280.png',
            }}
            style={styles.image}
          />

          <ThemedText type="title" style={styles.heading}>
            {profile?.username || user?.email || 'Guest'}
          </ThemedText>

          <View style={[styles.infoBox, { backgroundColor, opacity: 0.7, borderColor }]}>
            <ProfileRow label="Email" value={user?.email} />
            <ProfileRow label="Name" value={profile?.full_name} />
            <ProfileRow label="Age" value={profile?.user_age} />
            <ProfileRow label="Location" value={profile?.location} />
            <ProfileRow label="Bio" value={profile?.user_bio} />
          </View>

          <View style={styles.buttonsContainer}>
            <Button
              title="Edit Profile"
              buttonStyle={[styles.button, { backgroundColor }]}
              titleStyle={{ color: textColor }}
              onPress={() => router.push('/profile/edit')}
            />
            <Button
              title="Sign Out"
              buttonStyle={[styles.button, { backgroundColor }]}
              titleStyle={{ color: textColor }}
              onPress={handleSignOut}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const ProfileRow = ({ label, value }: { label: string; value?: string }) => (
  <View style={styles.infoRow}>
    <ThemedText style={styles.labelBold}>{label}:</ThemedText>
    <ThemedText style={styles.label}>{value || 'Not set'}</ThemedText>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  background: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoBox: {
    width: '100%',
    padding: 16,
    borderRadius: 10,
    borderLeftWidth: 1.5,
    borderLeftColor: 'rgba(255,255,255,0.4)',
    borderBottomWidth: 1.8,
    borderBottomColor: 'rgba(255,255,255,0.4)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.4)',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: 'rgba(255,255,255,0.4)',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  labelBold: {
    fontWeight: 'bold',
  },
  label: {
    flexShrink: 1,
    textAlign: 'right',
    fontFamily: 'Inter_400Regular',
  },
  buttonsContainer: {
    width: '100%',
    gap: 10,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderLeftWidth: 1.5,
    borderLeftColor: 'rgba(255,255,255,0.4)',
    borderBottomWidth: 1.8,
    borderBottomColor: 'rgba(255,255,255,0.4)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.4)',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: 'rgba(255,255,255,0.4)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
