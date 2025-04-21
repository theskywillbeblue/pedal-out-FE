import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import FloatingSearchBar from '../../components/search';
import RideCardList from '../../components/RideCardList';
import { getRides } from '../../api.js';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function MainScreen() {
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
  <ThemedView
    style={{
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 32,
      marginBottom: -12,

    }}
  >
    <TouchableOpacity onPress={() => router.push('/MapScreen')}>
      <Ionicons name="location-outline" size={24} color="gray" />
    </TouchableOpacity>
    <Ionicons name="bicycle-outline" size={24} color="gray" />
    <Ionicons name="heart-outline" size={24} color="gray" />
  </ThemedView>
</SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText style={styles.title}>Nearby rides <ThemedText style={styles.subtitle}>user location</ThemedText></ThemedText>
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
  },
  scrollContent: {
    paddingHorizontal: 16,
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
});
