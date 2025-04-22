import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PostRide from '@/components/PostRidePanel';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import MapView, { Marker } from 'react-native-maps';
import { useColorScheme } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import ParallaxScrollView from '@/components/ParallaxScrollView';

import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const mapBackground = useThemeColor({ light: '#eee', dark: '#222' });

  const backgroundColor = colorScheme === 'dark' ? '#000' : '#fff';


  const handleLongPress = () => {
    router.push('/MapScreen');
  };

  return (
    <ParallaxScrollView
      headerImage={
        <TouchableOpacity
          onLongPress={handleLongPress}
          activeOpacity={1}
          style={styles.mapPreviewContainer}
        >
          <MapView
            style={[styles.mapPreview, { backgroundColor: mapBackground }]}
            initialRegion={{
              latitude: 54.6586,
              longitude: -1.9325,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            pointerEvents="none"
          >
            <Marker
              coordinate={{ latitude: 54.6586, longitude: -1.9325 }}
              title="Hamsterly Forest"
            />
          </MapView>
        </TouchableOpacity>
      }
      headerBackgroundColor={{
        light: '#fff',
        dark: '#222',
      }}
      headerHeight={300} // Set the header height to 400
      bottomPadding={20}
    >
      <PostRide />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  mapPreviewContainer: {
    height: 300, // Adjust the height to 400
    width: '100%',
    borderRadius: 6,
    overflow: 'hidden',
  },
  mapPreview: {
    backgroundColor: '#eee',
    width: '100%',
    height: '100%',
  },
});
