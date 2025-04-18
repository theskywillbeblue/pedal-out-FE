import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import FloatingSearchBar from '../../components/search';
import ImageGridSquares from '../../components/ImageGrid_Explore';
import { getRides } from '../../api.js';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export const options = {
  headerShown: false,
};

export default function TabOneScreen() {
  const [rides, setRides] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  // type Props = {
  //   rides: any[];
  // };

  return (
    <ThemedSafeAreaView style={styles.safeArea}>
      {/* Use ThemedSafeAreaView */}
      <FloatingSearchBar />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginTop: 75,
          marginBottom: 5,
        }}
      >
        <TouchableOpacity onPress={() => router.push('/MapScreen')}>
          <Ionicons name="location-outline" size={24} color="gray" />
        </TouchableOpacity>
        <Ionicons name="bicycle-outline" size={24} color="gray" />
        <Ionicons name="heart-outline" size={24} color="gray" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText style={styles.title}>Rides Nearby</ThemedText>
        <ThemedText style={styles.subtitle}>user location</ThemedText>
        <ThemedView>
          {/* Wrap ImageGridSquares in ThemedView */}
          <ImageGridSquares rides={rides} />
        </ThemedView>
      </ScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 15, // enough space to avoid overlap with search bar

    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  title: {
    fontFamily: 'HelveticaRoundedBold',
    fontSize: 25,
    lineHeight: 30,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'HelveticaRoundedBold',
    color: 'gray',
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 20,
  },
});
