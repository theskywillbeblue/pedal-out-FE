import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView'; // Updated import
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView'; // Import ThemedView
import FloatingSearchBar from '../../components/search';
import ImageGridSquares from '../../components/ImageGrid_Explore';
import { getRides } from '../../api.js';
import { useNavigation } from '@react-navigation/native';

export const options = {
  headerShown: false,
};

export default function TabOneScreen() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRides()
      .then((rides) => {
        setRides(rides);
        console.log(rides);
      })
      .catch((error) => {
        console.error('Error fetching rides:', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [rides]);

  const navigation = useNavigation();

  return (
    <ThemedSafeAreaView style={styles.safeArea}> {/* Use ThemedSafeAreaView */}
      <FloatingSearchBar />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText style={styles.title}>Rides Nearby</ThemedText>
        <ThemedText style={styles.subtitle}>user location</ThemedText>
        <ThemedView> {/* Wrap ImageGridSquares in ThemedView */}
          <ImageGridSquares />
        </ThemedView>
      </ScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // You might not need to set backgroundColor here if ThemedSafeAreaView handles it
  },
  scrollContent: {
    paddingTop: 100, // enough space to avoid overlap with search bar
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