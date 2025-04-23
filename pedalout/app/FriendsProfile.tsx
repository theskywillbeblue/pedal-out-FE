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

export default function Friendsfriend() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const friendName = params.username;
  const [friend, setFriend] = useState({});
  const [isFollowed, setIsFollowed] = useState(false);
  const [following, setFollowing] = useState([]);
  const { profile } = useContext(UserContext);

  useEffect(() => {
    let followingCopy;
    let friendCopy;
    const fetchFriend = async () => {
      try {
        const { data, error } = await supabase
          .from('user_profile')
          .select('*')
          .eq('username', friendName)
          .single();
        return data;
      } catch (error) {
        console.error(error);
        return error;
      }
    };

    getFriends(profile.username)
      .then((res) => {
        setFollowing(res.followedUsers);
        followingCopy = res.followedUsers;
      })
      .then(() => {
        return fetchFriend();
      })
      .then((friendProfile) => {
        setFriend(friendProfile);
        friendCopy = friendProfile;
      })
      .then(() => {
        if (followingCopy.includes(friendCopy.username)) {
          setIsFollowed(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // useEffect(() => {
  //   console.log(isFollowed, '<<<<<<<< before');
  //   console.log(friend.username, '<<<<<<<< name');
  //   console.log(following, '<<<<<<<< following');
  //   if (following.includes(toString(friend.username))) {
  //     console.log('t');
  //     setIsFollowed(true);
  //   }
  //   console.log(isFollowed, '<<<<<<<< after');
  // }, [isFollowed]);
      
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleFollowPress = async () => {
    try {
      console.log(profile.username, "<<<< current user");
      console.log(friend.username, "<<<< friend");
      
      if (isFollowed) {
        await removeFriend(profile.username, friend.username);
        setIsFollowed(!isFollowed);
      } else {
        await addFriend(profile.username, friend.username);
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
          {friend?.username || friend?.email}!
        </ThemedText>

        <Image
          source={{
            uri:
              friend?.avatar_img ||
              'https://cdn.pixabay.com/photo/2013/07/13/12/49/guy-160411_1280.png',
          }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>Email: </ThemedText>
            <ThemedText type="tabText">{friend?.email}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>Name: </ThemedText>
            <ThemedText type="tabText">
              {friend?.full_name || 'No name set'}
            </ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>Age: </ThemedText>
            <ThemedText type="tabText">
              {friend?.user_age || 'No age set'}
            </ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>Location: </ThemedText>
            <ThemedText type="tabText">
              {friend?.location || 'No location set'}
            </ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>Bio: </ThemedText>
            <ThemedText type="tabText">
              {friend?.user_bio || 'No bio made'}
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
    fontFamily: 'HelveticaRoundedBold',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  label: {
    fontFamily: 'HelveticaRoundedBold',
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '80%',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#4F7942',
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
