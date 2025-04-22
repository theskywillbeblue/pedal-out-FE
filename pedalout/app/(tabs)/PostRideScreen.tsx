import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PostRide from '@/components/PostRidePanel';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';
import { useColorScheme } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import ParallaxScrollView from '@/components/ParallaxScrollView';

import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ScrollView } from 'react-native-gesture-handler';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const mapBackground = useThemeColor({ light: '#eee', dark: '#222' });
  const [markerCoordinates, setMarkerCoordinates] = useState([
    54.6586, -1.9325,
  ]);
  const [open, setOpen] = useState(false);

  const backgroundColor = colorScheme === 'dark' ? '#000' : '#fff';


  const onLocationSelect = (event: MapPressEvent) => {
    setMarkerCoordinates([
      event.nativeEvent.coordinate.latitude,
      event.nativeEvent.coordinate.longitude,
    ]);
  };
  return (
    <ThemedSafeAreaView>
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        nestedScrollEnabled={false}
        scrollEnabled={!open}
        horizontal={false}
      >
        {/* Your scrollable content goes here */}
        <TouchableOpacity activeOpacity={1} style={styles.mapPreviewContainer}>
          <MapView
            style={[styles.mapPreview, { backgroundColor: mapBackground }]}
            initialRegion={{
              latitude: 54.6586,
              longitude: -1.9325,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            pointerEvents="none"
            onPress={onLocationSelect}
          >
            <Marker
              coordinate={{
                latitude: markerCoordinates[0],
                longitude: markerCoordinates[1],
              }}
              title=""
            />
          </MapView>
        </TouchableOpacity>
        <PostRide
          latitude={markerCoordinates[0]}
          longitude={markerCoordinates[1]}
          open={open}
          setOpen={setOpen}
        />
      </ScrollView>
    </ThemedSafeAreaView>
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
