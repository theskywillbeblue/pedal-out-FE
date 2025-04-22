import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
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

  // 

  useEffect(() => {
    getFriends('sophiaP_2025xyzq')
      .then((res) => {
        setFollowers(res.usersFollowers);
        setFollowing(res.followedUsers);
      })
      .catch((error) => {
        setError(error);

        throw (error);
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
          [follower.username]: follower.full_name
        }));

        setFollowerNames(usernameFullName);
        setFollowerAvatars(usernameAvatar);
      } catch (error) {
        
      }
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
          [followed.username]: followed.full_name
        }));

        setFollowingNames(usernameFullName);
        setFollowingAvatars(usernameAvatar);
      } catch (error) {
        
      }
    }

    if (followers.length > 0) {
      getFollowingData();
    }
  }, [following]);


  if (isLoading) {
    return <Text>Fetching your friends...</Text>;
  }
  if (error) {
    return <Text>Houston, we have a problem!</Text>;
  }

  return (<ThemedSafeAreaView style={{ flex: 1}}>
    <ThemedText type="title" style={styles.title}>Connections</ThemedText>
    <View style={styles.columnsContainer}>
      {/* Following */}
      <View style={styles.column}>
        <ThemedText style={styles.sectionHeader}>Following{'\n'}<Text style={styles.figures}>({following.length})</Text></ThemedText>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.columnContent}
        >
          {following.map((followee) => {
            const avatar_img = followingAvatars.find((entry) => followee in entry)?.[followee];
            const full_name = followingNames.find((entry) => followee in entry)?.[followee];
  
            return (
              
              <View key={followee} style={styles.avatarCard}>
                <TouchableOpacity  onPress={() =>
                              router.push({pathname: '../FriendsProfile', params: { username: followee }})}>

                <ThemedText style={styles.avatarName}>{full_name}</ThemedText>
                <Image style={styles.avatarPlaceholder} source={{ uri: avatar_img }} />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
  
      {/* Followers */}
      <View style={styles.column}>
        <ThemedText style={styles.sectionHeader}>Followers{'\n'}<Text style={styles.figures}>({followers.length})</Text></ThemedText>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.columnContent}
        >
          {followers.map((follower) => {
            const avatar_img = followerAvatars.find((entry) => follower in entry)?.[follower];
            const full_name = followerNames.find((entry) => follower in entry)?.[follower];
  
            return (
              <View key={follower} style={styles.avatarCard}>
                  <TouchableOpacity  onPress={() =>
                              router.push({pathname: '../FriendsProfile', params: { username: follower }})}>
                 <ThemedText style={styles.avatarName}>{full_name}</ThemedText>
                 <Image style={styles.avatarPlaceholder} source={{ uri: avatar_img }} />
                 
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
    fontSize: 28,
    lineHeight: 30,
    marginBottom: 8,
    alignSelf: 'center',
    textShadowColor: 'rgb(0, 0, 0)',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 5,
  },
  avatarPlaceholder: {
    alignSelf: 'center',
    width: 75,
    height: 75,
    borderRadius: 55,
    backgroundColor: '#ccc',
  },

  avatarName: {
    fontFamily: 'HelveticaRounded',
    fontSize: 13,
    fontWeight: 600,
    color: '#BEBEBE',
    marginBottom: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    fontSize: 22,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
    color: '#fff',
  },

  avatarCard: {
    width: 140,
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#222',
    borderRadius: 10,
    paddingBottom: 10,
    paddingTop: 6,
    boxShadow: '#000',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.3,
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
  columnContent: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  figures: {
    fontSize: 14,
    textAlign: 'center',
  }
});
