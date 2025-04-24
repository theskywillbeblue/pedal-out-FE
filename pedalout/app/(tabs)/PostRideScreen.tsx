import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import PostRide from '@/components/PostRidePanel';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';

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
    <SafeAreaProvider>
      {/* <ScrollView
        nestedScrollEnabled={false}
        scrollEnabled={!open}
        horizontal={false}
      > */}
    
      <ThemedText style={styles.closeText}>Select the location and post your ride</ThemedText>
  
           
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
            onPress={onLocationSelect}
          >
            <Marker
              coordinate={{
                latitude: markerCoordinates[0],
                longitude: markerCoordinates[1],
              }}
              title="Ride Location"
            />
          </MapView>
        </TouchableOpacity>
        <PostRide
          latitude={markerCoordinates[0]}
          longitude={markerCoordinates[1]}
          open={open}
          setOpen={setOpen}
        />
      {/* </ScrollView> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mapPreviewContainer: {
    height: 280, 
    width: '100%',
    borderRadius: 6,
    overflow: 'hidden',
  },
  mapPreview: {
    backgroundColor: '#eee',
    height: '100%',
  },
  closeText: {
    position: 'absolute',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 16,             
    color: '#fff',
    fontSize: 18,
    zIndex: 10,
  },
});
