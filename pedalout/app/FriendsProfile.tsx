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
import { router, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ScrollView } from 'react-native-gesture-handler';
import { supabase } from '@/lib/supabase';
import { Button } from '@rneui/themed';
import { addFriend, getAllChatsByUsername, getFriends, postNewMessage, removeFriend } from '@/api';
import { UserContext } from './context/UserContext';
import { useColorScheme } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function Friendsfriend() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const friendName = params.username;
  const [isFollowed, setIsFollowed] = useState(false);
  const [friendsFollowing, setFriendsFollowing] = useState([]);
  const [friendsFollowers, setFriendsFollowers] = useState([]);
  const [friendProfile, setFriendProfile] = useState([]);
  const [chatInfo, setChatInfo] = useState([]);
  const [chatIds, setChatIds] = useState([]);
  const [chatPartners, setChatPartners] = useState([]);
  const { profile } = useContext(UserContext);
  const loggedInUser = profile.username;

   const colorScheme = useColorScheme();
  
    const borderColor = useThemeColor({ light: '#ccc', dark: '#444' });
    const backgroundColor = colorScheme === 'dark' ? '#000' : '#fff';
    const textColor = colorScheme === 'dark' ?   '#fff': '#000';

  useEffect(() => {
    getFriends(friendName)
    .then((res) => {
      setFriendsFollowing(res.followedUsers);
      setFriendsFollowers(res.usersFollowers);
      getFriendProfile();

      if(res.usersFollowers.includes(loggedInUser)) {
        setIsFollowed(true);
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }, [loggedInUser]);

  const getFriendProfile = async () => {
    try {
        const { data, error } = await supabase
          .from('user_profile')
          .select('*')
          .eq('username', friendName)
          .single();

        if(error) {
          console.error(`Error fetching profile for ${friendName}:`, error.message);
          return null;
        }
        setFriendProfile(data);
        return data || null;

      } catch (err) {
      console.error('Failed to fetch friend profile:', err);
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
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.closeButtonContainer}>
          {/* Floating X Button - we can add this to Sign up page too? */}
          <Pressable
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeText}>✕</Text>
          </Pressable>
        </View>
        <ThemedText type="title" style={styles.heading}>
          {friendProfile?.full_name}
        </ThemedText>

        <Image
          source={{
            uri:
            friendProfile?.avatar_img ||
              'https://cdn.pixabay.com/photo/2013/07/13/12/49/guy-160411_1280.png',
          }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={[styles.infoBox, {backgroundColor}, {opacity: 0.7}]}>
          <View style={styles.infoRow}>
            <ThemedText style={styles.labelBold}>@{friendProfile?.username}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            
            <ThemedText style={styles.label}>
              {friendProfile?.full_name || 'No name set'} / {friendProfile?.user_age || 'No age set'}
            </ThemedText>
          </View>
          
          
          <View style={styles.infoRow}>

            <ThemedText style={styles.label}>
              {friendProfile?.location || 'No location set'}
            </ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.labelBold}>Bio: </ThemedText>
            <ThemedText style={styles.label}>
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
  );
}

const styles = StyleSheet.create({
  closeButtonContainer: {
    flex: 1,
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
    zIndex: 10,
  },
  closeText: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 24,
  },

  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    alignItems: 'center',
    padding: 10,
  },
  heading: {
    marginTop: 20,
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
    backgroundColor: '#BEBEBE',
    borderWidth: 3,
    borderColor: '#fff',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
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
    width: '80%',
    backgroundColor: '#e63946',
  },
  buttonText: {
    textAlign: 'center',
    width: '100%',
  },
});
