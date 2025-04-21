import React, { useMemo } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { router, useLocalSearchParams } from 'expo-router';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useThemeColor } from '@/hooks/useThemeColor';


export default function RideDetails() {
  const colorScheme = useColorScheme();
  const mapBackground = useThemeColor({ light: '#eee', dark: '#222' });
  const backgroundColor = colorScheme === 'dark' ? '#000' : '#fff';
  const { ride } = useLocalSearchParams();
  const parsedRide = JSON.parse(ride as string);


  const handleLongPress = () => {
    router.push('/MapScreen');
  };

  return (
    <ThemedSafeAreaView>
      <Pressable style={styles.closeButton} onPress={() => router.back()}>
        <Text style={styles.closeText}>✕</Text>
      </Pressable>
      <ParallaxScrollView
        headerImage={
          <TouchableOpacity
            onLongPress={handleLongPress}
            activeOpacity={1}
            style={styles.mapPreviewContainer}
          >
            <MapView
              style={[styles.mapPreview]}
              initialRegion={{
                latitude: parsedRide.ride_location.lat,
                longitude: parsedRide.ride_location.lng,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              pointerEvents="none"
            >
              <Marker
                coordinate={{
                  latitude: parsedRide.ride_location.lat,
                  longitude: parsedRide.ride_location.lng,
                }}
                title="Hamsterly Forest"
              />
            </MapView>
          </TouchableOpacity>
        }
        headerBackgroundColor={{
          light: '#fff',
          dark: '#222',
        }}
        headerHeight={350}
      ></ParallaxScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  mapPreviewContainer: {
    height: 400,
    width: '100%',
  },
  mapPreview: {
    backgroundColor: '#eee',
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeText: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 24,
  },
});
