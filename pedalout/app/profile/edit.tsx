import React, { useState, useEffect, useContext } from 'react';
import {
  ScrollView,
  View,
  Alert,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { supabase } from '../../lib/supabase';
import { UserContext } from '../context/UserContext';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Input, Text, Button } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useColorScheme } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function EditUser() {
  const navigation = useNavigation();
  const { user, profile, refreshProfile } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const [displayName, setDisplayName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userFullName, setUserFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [userBio, setUserBio] = useState('');
  const router = useRouter();

  const colorScheme = useColorScheme();

  const borderColor = useThemeColor({ light: '#ccc', dark: '#444' });
  const backgroundColor = colorScheme === 'dark' ? '#000' : '#fff';
  const textColor = colorScheme === 'dark' ? '#fff' : '#000';

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.username || '');
      setUserFullName(profile.full_name || '');
      setUserAge(profile.user_age?.toString() || '');
      setAvatarUrl(profile.avatar_img || '');
      setUserBio(profile.user_bio || '');
    }
  }, [profile]);

  const pickImageAndUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        'Permission Required',
        'Permission to access media library is needed!',
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setImageUploading(true);
      const file = result.assets[0];

      const fileExt = file.uri.split('.').pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;
      const filePath = fileName;

      try {
        const base64 = file.base64;

        const byteCharacters = atob(base64);
        const byteArray = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteArray[i] = byteCharacters.charCodeAt(i);
        }

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('user-profile-image')
          .upload(filePath, byteArray, {
            contentType: 'image/jpeg',
            upsert: true,
          });

        if (uploadError) {
          Alert.alert('Upload Error', uploadError.message);
          setImageUploading(false);
          return;
        }

        const { data: publicData, error: publicUrlError } = supabase.storage
          .from('user-profile-image')
          .getPublicUrl(filePath);

        if (publicUrlError) {
          Alert.alert('Error', publicUrlError.message);
          setImageUploading(false);
          return;
        }

        if (publicData?.publicUrl) {
          setAvatarUrl(publicData.publicUrl);
          Alert.alert('Success', 'Image uploaded!');

          const { error } = await supabase
            .from('user_profile')
            .update({ avatar_img: publicData.publicUrl })
            .eq('user_id', user.id);

          if (error) {
            Alert.alert('Profile update failed', error.message);
          } else {
            await refreshProfile();
          }
        }
      } catch (err) {
        Alert.alert(
          'Unexpected Error',
          err.message || 'Something went wrong during image upload.',
        );
      } finally {
        setImageUploading(false);
      }
    }
  };

  async function editUserDetails() {
    if (!user) return;

    setLoading(true);

    const { error } = await supabase
      .from('user_profile')
      .update({
        username: displayName,
        full_name: userFullName,
        user_age: userAge,
        avatar_img: avatarUrl,
        user_bio: userBio,
      })
      .eq('user_id', user.id);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Details updated!');
      await refreshProfile();
      router.back();
    }

    setLoading(false);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.closeButtonContainer}>
          <Pressable
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeText}>✕</Text>
          </Pressable>
        </View>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.image} />
          ) : (
            <Text style={styles.text}>No Avatar Selected</Text>
          )}
          {imageUploading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Button
              title="Pick an Avatar"
              onPress={pickImageAndUpload}
              buttonStyle={[styles.button, { backgroundColor }]}
              titleStyle={styles.buttonText}
            />
          )}
        </View>
        <View style={styles.infoHolder}>
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
              label="Full Name"
              leftIcon={{ type: 'font-awesome', name: 'user' }}
              onChangeText={setUserFullName}
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
              onChangeText={setUserAge}
              value={userAge}
              placeholder="Your Age"
            />
          </View>

          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Input
              inputStyle={styles.input}
              label="User Bio"
              leftIcon={{ type: 'font-awesome', name: 'info-circle' }}
              onChangeText={setUserBio}
              value={userBio}
              placeholder="About you"
              autoCapitalize="none"
            />
          </View>
        </View>
        <View
          style={[
            styles.verticallySpaced,
            styles.mt20,
            { alignItems: 'center' },
          ]}
        >
          <Button
            title="Set your location"
            buttonStyle={[styles.button, { backgroundColor }]}
            titleStyle={styles.buttonText}
            onPress={() => router.push('/profile/locationSetterMap')}
          />
          <Button
            title={loading ? 'Updating...' : 'Update'}
            buttonStyle={[styles.button, { backgroundColor }]}
            titleStyle={styles.buttonText}
            disabled={loading}
            onPress={editUserDetails}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  closeButtonContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 10,
  },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeText: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 24,
  },

  verticallySpaced: {
    alignSelf: 'stretch',
    height: 80,
  },
  mt20: {
    marginTop: 0,
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 100,
    marginBottom: 10,
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
  input: {
    color: 'white',
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
    margin: 7,
  },
  buttonText: {
    textAlign: 'center',
    width: '100%',
  },
  infoHolder: {
    marginTop: 15,
    marginBottom: 15
  },
});
