import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { router, useLocalSearchParams } from 'expo-router';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useThemeColor } from '@/hooks/useThemeColor';
import RideDetailsPanel from '@/components/RideDetailsPanel';
import { ThemedView } from '@/components/ThemedView';

export default function RideDetails() {
  const colorScheme = useColorScheme();

  const borderColor = useThemeColor({ light: '#ccc', dark: '#444' });
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
          <View style={styles.imageContainer}>
            <Image source={{ uri: parsedRide.ride_img_url || 'https://images.pexels.com/photos/1174106/pexels-photo-1174106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}} style={styles.headerImage} resizeMode="cover" />
            <TouchableOpacity
  onPress={handleLongPress}
  activeOpacity={0.9}
  style={[styles.floatingMap, { borderColor }]}
>
  <MapView
    style={styles.mapPreview}
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
          </View>
        }
        headerBackgroundColor={{
          light: '#fff',
          dark: '#222',
        }}
        headerHeight={450}
      >
        <RideDetailsPanel />
        <ThemedView style={{ marginBottom: 300 }} />
      </ParallaxScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 350,
    width: '100%',
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-end'
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  floatingMap: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 120,
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
  },
  mapPreview: {
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
