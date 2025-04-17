import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView'; // Updated import
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView'; // Import ThemedView
import FloatingSearchBar from '../../components/search';
import ImageGridSquares from '../../components/ImageGrid_Explore';

import { getRides } from '../../api.js';
import { useNavigation } from '@react-navigation/native';

import { useEffect, useState } from 'react';

import { Ionicons } from '@expo/vector-icons';


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
    return <Text>Rides are on their way...</Text>;
  }
  if (error) {
    return <Text>Houston, we have a problem!</Text>;
  }

  type Props = {
    rides: any[];
  };


  return (
    <ThemedSafeAreaView style={styles.safeArea}> {/* Use ThemedSafeAreaView */}
      <FloatingSearchBar />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 75 }}>
        <Ionicons name="location-outline" size={24} color="gray" />
        <Ionicons name="bicycle-outline" size={24} color="gray" />
        <Ionicons name="heart-outline" size={24} color="gray" />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <ThemedText style={styles.title}>Rides Nearby</ThemedText>
        <ThemedText style={styles.subtitle}>user location</ThemedText>
        <ThemedView> {/* Wrap ImageGridSquares in ThemedView */}
           <ImageGridSquares rides={rides} />
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