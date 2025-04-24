import React, { useLayoutEffect, useContext } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { UserContext } from './context/UserContext';

export default function MapScreen() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const rides = JSON.parse(params.rides);
  const { profile } = useContext(UserContext);
  const userLat = parseFloat(profile?.user_coordinate?.lat);
  const userLng = parseFloat(profile?.user_coordinate?.lng);
  const router = useRouter();
  const isIndividualRide = rides.length === 1;

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: isIndividualRide
            ? rides[0].ride_location.lat
            : userLat || 50.7192,
          longitude: isIndividualRide
            ? rides[0].ride_location.lng
            : userLng || -1.8808,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
      >
        {/*  Map through rides and put marker details on map */}
        {rides.map((ride: any) => (
          <Marker
            key={ride.ride_id}
            coordinate={{
              latitude: ride.ride_location.lat,
              longitude: ride.ride_location.lng,
            }}
            title={ride.title}
          >
            <Callout
              onPress={() =>
                router.push({
                  pathname: '/RideDetails',
                  params: { ride: JSON.stringify(ride) },
                })
              }
            >
              <Text>{ride.title}</Text>
            </Callout>
          </Marker>
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
