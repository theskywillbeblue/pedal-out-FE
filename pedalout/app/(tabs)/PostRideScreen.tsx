import { StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import PostRide from '@/components/PostRidePanel';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText style={styles.title}>Post A Ride</ThemedText>
        <PostRide />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
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
