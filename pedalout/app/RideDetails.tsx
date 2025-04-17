import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PostRide from '@/components/PostRidePanel';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import MapView, { Marker } from 'react-native-maps';
import { useColorScheme } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import ParallaxScrollView from '@/components/ParallaxScrollView'; // Import your custom ParallaxScrollView
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const mapBackground = useThemeColor({ light: '#eee', dark: '#222' });

  const backgroundColor = colorScheme === 'dark' ? '#000' : '#fff';
  const navigation = useNavigation(); // Use navigation hook

  const handleLongPress = () => {
    // Navigate to MapScreen when long-pressed
    navigation.navigate('MapScreen');
  };

  return (
    <ThemedSafeAreaView style={styles.safeArea}>
      <ParallaxScrollView
        headerImage={
          <TouchableOpacity onLongPress={handleLongPress} activeOpacity={1} style={styles.mapPreviewContainer}>
            <MapView
              style={[styles.mapPreview, { backgroundColor: mapBackground }]}
              initialRegion={{
                latitude: 51.5072,
                longitude: -0.1276,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              pointerEvents="none"
            >
              <Marker coordinate={{ latitude: 51.5072, longitude: -0.1276 }} title="Hamster Heath" />
            </MapView>
          </TouchableOpacity>
        }
        headerBackgroundColor={{
          light: '#fff',
          dark: '#222',
        }}
        headerHeight={400} // Set the header height to 400
        bottomPadding={20}
      >
        
      </ParallaxScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mapPreviewContainer: {
    height: 400, // Adjust the height to 400
    width: '100%',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 0,
  },
  mapPreview: {
    flex: 1,
    backgroundColor: '#eee',
    width: '100%',
    height: '100%',
  },
});
