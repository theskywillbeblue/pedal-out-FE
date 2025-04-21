import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';

export default function MapScreen() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const rides = JSON.parse(params.rides);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50.7192,
          longitude: -1.8808,
          latitudeDelta: 0.6,
          longitudeDelta: 0.6,
        }}
      >
        {/*  Map through rides and put marker details on map */}
        {rides.map((ride) => (
          <Marker
            key={ride.ride_id}
            title={ride.title}
            coordinate={{
              latitude: ride.ride_location.lat,
              longitude: ride.ride_location.lng,
            }}
          />
        ))}
      </MapView>

      {/* Floating X Button - we can add this to Sign up page too? */}
      <Pressable style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeText}>✕</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
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
