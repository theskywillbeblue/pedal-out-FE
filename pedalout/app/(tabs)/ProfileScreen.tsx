import {
  SafeAreaView,
  ScrollView,
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
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
// import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, profile, loading } = useContext(UserContext);
 const colorScheme = useColorScheme();

  const borderColor = useThemeColor({ light: '#ccc', dark: '#444' });
  const backgroundColor = colorScheme === 'dark' ? '#000' : '#fff';
  const textColor = colorScheme === 'dark' ?   '#fff': '#000';

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
    <ImageBackground
      source={require('../../assets/images/ProfileBackgroundWhiteLow.png')}
      style={styles.background}
      imageStyle={{ opacity: 0.4 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <ThemedText type="title" style={styles.heading}>
            Welcome,{'\n'}
            {profile?.username || user?.email || 'Guest'}!
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
        <ThemedView style={[styles.infoBox, {backgroundColor}, {opacity: 0.7} ]}>
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
        </ThemedView>

        {/* Gallery function to add when functionality available */}
        {/* <Button
          title="Open Gallery"
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={() => router.push('/profile/gallery')}
        /> */}

          <Button
            title="Edit Profile"
            buttonStyle={[styles.button, {backgroundColor}, {opacity: 0.8}]}
            titleStyle={[styles.buttonText, {color: textColor}]}
            onPress={() => router.push('/profile/edit')}
          />
          <Button
            title="Sign Out"
            buttonStyle={[styles.button, {backgroundColor}, styles.signOutButton, {opacity: 0.8}]}
            titleStyle={[styles.buttonText, {color: textColor}]}
            onPress={handleSignOut}
          />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  background: {
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
    elevation: 8,
  },
  infoBox: {
    width: '90%',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  infoRow: {
    flexDirection: 'row',
   // fontFamily: 'Inter_400Regular',
   
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginBottom: 5,
  },
  label: {
    fontFamily: 'Inter_400Regular',
        fontSize: 16,
        opacity: 1,
    
  },
  labelBold: {
    fontFamily: 'Inter_400Regular',
    fontWeight: 'bold',
    fontSize: 16,
    opacity: 1,
  },
  button: {
    width: '80%',
    borderRadius: 8,
    padding: 10,
    //backgroundColor: '#4F7942',
    backgroundColor: '#000',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    
  },
  signOutButton: {
    //backgroundColor: '#e63946',
    
  },
  buttonText: {
    fontSize: 14
    ,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    width: '100%',
  },
});
