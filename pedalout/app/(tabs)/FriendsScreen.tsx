import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { getFriends } from '../../api.js';
import { supabase } from '@/lib/supabase';

export default function FriendsScreen() {
  const profile = useContext(UserContext);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatars, setAvatars] = useState([]);
  const [fullName, setFullName] = useState([]);

  // console.log(profile.username);

  useEffect(() => {
    getFriends('n0ah_ahm3d_mtb')
      .then((res) => {
        setFollowers(res.usersFollowers);
        setFollowing(res.followedUsers);
      })
      .catch((error) => {
        setError(error);

        throw New(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    async function getAvatars() {
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

        setFullName(usernameFullName);
        setAvatars(usernameAvatar);
      } catch (error) {
        console.error('Error fetching avatars:', error);
      }
    }

    if (followers.length > 0) {
      getAvatars();
    }
  }, [followers]);


  if (isLoading) {
    return <Text>Fetching your friends...</Text>;
  }
  if (error) {
    return <Text>Houston, we have a problem!</Text>;
  }

  return (<ThemedSafeAreaView style={{ flex: 1}}>
    <ThemedText type="title" style={styles.title}>Friends</ThemedText>
    <View style={styles.columnsContainer}>
      {/* Following */}
      <View style={styles.column}>
        <ThemedText style={styles.sectionHeader}>Following</ThemedText>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.columnContent}
        >
          {following.map((followee) => {
            const avatar_img = avatars.find((entry) => followee in entry)?.[followee];
            const full_name = fullName.find((entry) => followee in entry)?.[followee];
  
            return (
              <View key={followee} style={styles.avatarCard}>
                <ThemedText style={styles.avatarName}>{full_name}</ThemedText>
                <Image style={styles.avatarPlaceholder} source={{ uri: avatar_img }} />
              </View>
            );
          })}
        </ScrollView>
      </View>
  
      {/* Followers */}
      <View style={styles.column}>
        <ThemedText style={styles.sectionHeader}>Followers</ThemedText>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.columnContent}
        >
          {followers.map((follower) => {
            const avatar_img = avatars.find((entry) => follower in entry)?.[follower];
            const full_name = fullName.find((entry) => follower in entry)?.[follower];
  
            return (
              <View key={follower} style={styles.avatarCard}>
                 <Image style={styles.avatarPlaceholder} source={{ uri: avatar_img }} />
                  <ThemedText style={styles.avatarName}>{full_name}</ThemedText>
               
              
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
  },
  avatarPlaceholder: {
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
    paddingTop: 3,
  },
  sectionHeader: {
    fontSize: 22,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 20,
    color: '#fff',
  },

  avatarCard: {
    width: 150,
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#222',
    borderRadius: 10,
    paddingBottom: 5,
    paddingTop: 8,
    boxShadow: '#000',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.3,
  },
  columnsContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 7,
   
  },
  column: {
    flex: 1,
  },
  columnContent: {
    alignItems: 'center',
    paddingBottom: 40,
  },
});
