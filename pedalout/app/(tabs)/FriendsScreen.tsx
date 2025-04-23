import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { getFriends } from '../../api.js';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';

export default function FriendsScreen() {
  const profile = useContext(UserContext);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followerAvatars, setFollowerAvatars] = useState([]);
  const [followerNames, setFollowerNames] = useState([]);
  const [followingAvatars, setFollowingAvatars] = useState([]);
  const [followingNames, setFollowingNames] = useState([]);
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#000' : '#fff';

const username = profile.profile.username

  useEffect(() => {
    getFriends(username)
      .then((res) => {
        setFollowers(res.usersFollowers);
        setFollowing(res.followedUsers);
      })
      .catch((error) => {
        setError(error);

        throw error;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // get Followers
  useEffect(() => {
    async function getFollowerData() {
      try {
        const { data, error } = await supabase
          .from('user_profile')
          .select('username, avatar_img, full_name')
          .in('username', followers);

        if (error) throw error;

        const usernameAvatar = data.map((follower) => ({
          [follower.username]: follower.avatar_img,
        }));

        const usernameFullName = data.map((follower) => ({
          [follower.username]: follower.full_name,
        }));

        setFollowerNames(usernameFullName);
        setFollowerAvatars(usernameAvatar);
      } catch (error) {}
    }

    if (followers.length > 0) {
      getFollowerData();
    }
  }, [followers]);

  // get Following
  useEffect(() => {
    async function getFollowingData() {
      try {
        const { data, error } = await supabase
          .from('user_profile')
          .select('username, avatar_img, full_name')
          .in('username', following);

        if (error) throw error;

        const usernameAvatar = data.map((followed) => ({
          [followed.username]: followed.avatar_img,
        }));

        const usernameFullName = data.map((followed) => ({
          [followed.username]: followed.full_name,
        }));

        setFollowingNames(usernameFullName);
        setFollowingAvatars(usernameAvatar);
      } catch (error) {}
    }

    if (followers.length > 0) {
      getFollowingData();
    }
  }, [following]);



  if (isLoading) {
    return <ThemedText>Fetching your friends...</ThemedText>;
  }
  if (error) {
    return <ThemedText>Houston, we have a problem!</ThemedText>;
  }

  return (
    <ThemedSafeAreaView style={{ flex: 1 }}>
      <ThemedText type="title" style={styles.title}>
        Connections
      </ThemedText>
      <View style={styles.columnsContainer}>
        {/* Following */}
        <View style={styles.column}>
          <ThemedText style={styles.sectionHeader}>
            Following{'\n'}
            <ThemedText style={styles.figures}>({following.length})</ThemedText>
          </ThemedText>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.columnContent}
          >
            {following.map((followee) => {
              const avatar_img = followingAvatars.find(
                (entry) => followee in entry,
              )?.[followee];
              const full_name = followingNames.find(
                (entry) => followee in entry,
              )?.[followee];

              return (
                <View key={followee} style={styles.avatarCard}>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: '../FriendsProfile',
                        params: { username: followee },
                      })
                    }
                  >
                    <View style={styles.avatarWrapper}>
                      <Image
                        style={styles.avatarImage}
                        source={{ uri: avatar_img }}
                      />
                      <View style={styles.nameOverlay}>
                        <ThemedText style={styles.nameText}>
                          {full_name}
                        </ThemedText>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* Followers */}
        <View style={styles.column}>
          <ThemedText style={styles.sectionHeader}>
            Followers{'\n'}
            <ThemedText style={styles.figures}>({followers.length})</ThemedText>
          </ThemedText>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.columnContent}
          >
            {followers.map((follower) => {
              const avatar_img = followerAvatars.find(
                (entry) => follower in entry,
              )?.[follower];
              const full_name = followerNames.find(
                (entry) => follower in entry,
              )?.[follower];


              return (
                <View key={follower} style={styles.avatarCard}>
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: '../FriendsProfile',
                        params: { username: follower },
                      })
                    }
                  >
                    <View style={styles.avatarWrapper}>
                      <Image
                        style={styles.avatarImage}
                        source={{ uri: avatar_img }}
                      />
                      <View style={styles.nameOverlay}>
                        <ThemedText style={styles.nameText}>
                          {full_name}
                        </ThemedText>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'HelveticaRoundedBold',
    fontSize: 32,
    textAlign: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginBottom: 16,
    backgroundColor: '#f0f0f5',
    opacity: 0.8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5, // Android shadow
    color: '#333',
  },
  sectionHeader: {
    flexDirection: 'row',
    fontSize: 22,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  avatarCard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.3,
    backgroundColor: 'transparent', // Optional: for spacing
  },
  columnsContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 22,
    gap: 7,
  },
  column: {
    flex: 1,
  },
  figures: {
    fontSize: 14,
    textAlign: 'center',
  },
  avatarWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 55,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 55,
  },
  nameOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 6,
    paddingHorizontal: 6,
    alignItems: 'center',
    minHeight: 30,
    maxWidth: 100,
  },
  nameText: {
    maxWidth: 80,
    lineHeight: 14,
    fontSize: 11,
    color: '#fff',
    fontWeight: '400',
    textAlign: 'center',
    width: '100%',
    minHeight: 28,
    paddingTop: 2,
    paddingBottom: 2,
  },
});


