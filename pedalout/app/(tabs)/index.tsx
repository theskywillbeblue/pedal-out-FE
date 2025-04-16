import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import FloatingSearchBar from '../../components/search';
import ImageGridSquares from '../../components/ImageGrid_Explore';

export const options = {
  headerShown: false,
};

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Floating Search Bar at top */}
      <FloatingSearchBar />

      {/* Scrollable content starts below */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText style={styles.title}>Rides Nearby</ThemedText>
        <ThemedText style={styles.subtitle}>'user location'</ThemedText>


        {/* Placeholder for the image grid */}
        <ImageGridSquares />
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
