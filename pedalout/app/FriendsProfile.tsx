import React, { useLayoutEffect, useEffect, useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ScrollView } from 'react-native-gesture-handler';
import { supabase } from '@/lib/supabase';
import { Button } from '@rneui/themed';
import { addFriend, getFriends, removeFriend } from '@/api';
import { UserContext } from './context/UserContext';
import { useColorScheme } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ImageBackground } from 'react-native';
export default function Friendsfriend() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const friendName = params.username;
  const [isFollowed, setIsFollowed] = useState(false);
  const [friendsFollowing, setFriendsFollowing] = useState([]);
  const [friendsFollowers, setFriendsFollowers] = useState([]);
  const [friendProfile, setFriendProfile] = useState([]);
  const { profile } = useContext(UserContext);
  const loggedInUser = profile.username;

  const colorScheme = useColorScheme();

  const borderColor = useThemeColor({ light: '#ccc', dark: '#444' });
  const backgroundColor = colorScheme === 'dark' ? '#000' : '#fff';
  const textColor = colorScheme === 'dark' ? '#fff' : '#000';

  useEffect(() => {
    getFriends(friendName)
      .then((res) => {
        setFriendsFollowing(res.followedUsers);
        setFriendsFollowers(res.usersFollowers);
        getFriendProfile();

        if (res.usersFollowers.includes(loggedInUser)) {
          setIsFollowed(true);
        }
      })
      .catch((err) => {
        
      });
  }, [loggedInUser]);

  const getFriendProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profile')
        .select('*')
        .eq('username', friendName)
        .single();

      if (error) {
        console.error(
          `Error fetching profile for ${friendName}:`,
          error.message,
        );
        return null;
      }
      setFriendProfile(data);
      return data || null;
    } catch (err) {
      
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleFollowPress = async () => {
    try {
      if (isFollowed) {
        await removeFriend(loggedInUser, friendName);
        setIsFollowed(!isFollowed);
      } else {
        await addFriend(loggedInUser, friendName);
        setIsFollowed(!isFollowed);
      }
    } catch (err) {
      
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/ProfileBackgroundWhiteLow.png')}
      style={styles.background}
      imageStyle={{ opacity: 0.3 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.closeButtonContainer}>
            <Pressable
              style={styles.closeButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          <View style={styles.profileHeader}>
            <Image
              source={{
                uri:
                  friendProfile?.avatar_img ||
                  'https://cdn.pixabay.com/photo/2013/07/13/12/49/guy-160411_1280.png',
              }}
              style={styles.image}
              resizeMode="cover"
            />
            <ThemedText type="title" style={styles.name}>
              {friendProfile?.username}
            </ThemedText>
          </View>

          <View
            style={[
              styles.infoBox,
              { backgroundColor: backgroundColor, opacity: 0.7 },
            ]}
          >
            <View style={styles.infoRow}>
              <ThemedText style={styles.labelBold}>Name:</ThemedText>
              <ThemedText style={styles.labelRight}>
                {friendProfile?.full_name || 'No name set'}
              </ThemedText>
            </View>

            <View style={styles.infoRow}>
              <ThemedText style={styles.labelBold}>Age:</ThemedText>
              <ThemedText style={styles.labelRight}>
                {friendProfile?.user_age || 'No age set'}
              </ThemedText>
            </View>

            <View style={styles.infoRow}>
              <ThemedText style={styles.labelBold}>Location:</ThemedText>
              <ThemedText style={styles.labelRight}>
                {friendProfile?.location || 'No location set'}
              </ThemedText>
            </View>

            <View style={styles.infoRow}>
              <ThemedText style={styles.labelBold}>Bio:</ThemedText>
              <ThemedText style={styles.labelRight}>
                {friendProfile?.user_bio || 'No bio made'}
              </ThemedText>
            </View>
          </View>

          <Button
            title={isFollowed ? 'Unfollow' : 'Follow'}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            onPress={handleFollowPress}
          />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    alignItems: 'center',
    padding: 10,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 100, // Ensures the profile header doesn't touch the top
  },
  name: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 22, // Adjusted to match user profile size
    fontFamily: 'HelveticaRoundedBold',
  },
  image: {
    width: 120, // Smaller size for the friends page
    height: 120, // Smaller size for the friends page
    borderRadius: 60,
    marginBottom: 10, // Adjusted for consistent spacing
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  infoBox: {
    width: '90%',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#BEBEBE',
    borderWidth: 3,
    borderColor: '#fff',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    opacity: 1,
  },
  labelBold: {
    fontFamily: 'HelveticaRoundedBold',

    fontWeight: 'bold',
    fontSize: 16,
    opacity: 1,
  },
  labelRight: {
    flex: 1,
    textAlign: 'right',
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },
  button: {
    width: '80%',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#000',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    textAlign: 'center',
    width: '100%',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 24,
  },
});
