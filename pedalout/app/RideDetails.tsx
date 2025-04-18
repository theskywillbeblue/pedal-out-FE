import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { router } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function RideDetails() {
  const colorScheme = useColorScheme();
  const mapBackground = useThemeColor({ light: '#eee', dark: '#222' });
  const backgroundColor = colorScheme === 'dark' ? '#000' : '#fff';

  const handleLongPress = () => {
    router.push('/MapScreen');
  };

  return (
    <ThemedSafeAreaView style={styles.safeArea}>
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
              style={[styles.mapPreview, { backgroundColor: mapBackground }]}
              initialRegion={{
                latitude: 51.5072,
                longitude: -0.1276,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              pointerEvents="none"
            >
              <Marker
                coordinate={{ latitude: 51.5072, longitude: -0.1276 }}
                title="Hamster Heath"
              />
            </MapView>
          </TouchableOpacity>
        }
        headerBackgroundColor={{
          light: '#fff',
          dark: '#222',
        }}
        headerHeight={400}
        bottomPadding={20}
      ></ParallaxScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mapPreviewContainer: {
    height: 400,
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
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
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
