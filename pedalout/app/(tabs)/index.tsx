import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import FloatingSearchBar from '../../components/search';
import ImageGridSquares from '../../components/ImageGrid_Explore';
import { useEffect, useState } from 'react';
import { getRides } from '../../api.js';

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
    <SafeAreaView style={styles.safeArea}>
      <FloatingSearchBar />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText style={styles.title}>Rides Nearby</ThemedText>
        <ThemedText style={styles.subtitle}>user location</ThemedText>
        <ImageGridSquares rides={rides} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingTop: 80, // enough space to avoid overlap with search bar
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
