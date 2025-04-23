import React, { useEffect, useState, useContext } from 'react';
import {
  Platform,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import FloatingSearchBar from '../../components/search';
import RideCardList from '../../components/RideCardList';
import { getRides } from '../../api.js';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '../context/UserContext';

export default function MainScreen() {
  const { profile } = useContext(UserContext);
  const [rides, setRides] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const [user, setUser] = useState(null);

  useEffect(() => {
    getRides()
      .then((res) => {
        setRides(res.rides);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <ThemedText>Rides are on their way...</ThemedText>;
  }
  if (error) {
    return <ThemedText>Houston, we have a problem!</ThemedText>;
  }

  // getUser()
  // .then((res) => {
  //   setUser(res.username);
  // })
  // .catch((error) => {
  //   setError(error);
  // })

  return (
    <ThemedView style={styles.safeArea}>
      <FloatingSearchBar />
      <SafeAreaView>
        <ThemedView style={styles.iconBar}>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: '/MapScreen',
                params: { rides: JSON.stringify(rides) },
              })
            }
          >
            <Ionicons name="location-outline" size={24} color="gray" />
          </TouchableOpacity>
          <Ionicons name="bicycle-outline" size={24} color="gray" />
          <Ionicons name="heart-outline" size={24} color="gray" />
        </ThemedView>
      </SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText style={styles.title}>
          Nearby rides{' '}
          <ThemedText style={styles.subtitle}>
            {profile?.location || 'Location Unknown'}
          </ThemedText>
        </ThemedText>
        <ThemedView>
          <RideCardList rides={rides} />
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 24 : 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    marginTop: Platform.OS === 'android' ? 0 : 0,
  },
  title: {
    fontFamily: 'HelveticaRoundedBold',
    fontSize: 25,
    marginBottom: 18,
  },
  subtitle: {
    fontFamily: 'HelveticaRoundedBold',
    color: 'gray',
    fontSize: 16,
  },
  iconBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 20 : 32,
    marginBottom: Platform.OS === 'android' ? 0 : -32,
    paddingVertical: 12,
  },
});
