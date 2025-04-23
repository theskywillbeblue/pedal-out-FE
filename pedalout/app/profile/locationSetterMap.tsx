import React, { useLayoutEffect, useContext, useState } from 'react';
import { View, StyleSheet, Pressable, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';
import Geocoder from '../../api';

export default function LocSetMap() {
  const navigation = useNavigation();
  const { user, profile, refreshProfile } = useContext(UserContext);
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const router = useRouter();

  async function handleLocationSelect() {
    if (!user) return;

    if (!userLat || !userLng) {
      Alert.alert(
        'No location selected',
        'Please tap on the map to select your location.',
      );
      return;
    }

    setLoading(true);

    try {
      const response = await Geocoder.from(userLat, userLng);

      const components = response?.results?.[0]?.address_components || [];

      const postalTownComponent = components.find((comp) =>
        comp.types.includes('postal_town'),
      );

      const city = postalTownComponent?.long_name || 'Unknown location';

      setUserAddress(city);

      const { error } = await supabase
        .from('user_profile')
        .update({
          user_coordinate: { lat: userLat, lng: userLng },
          location: city,
        })
        .eq('user_id', user.id);

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Details updated!');
        await refreshProfile();
        router.back();
      }
    } catch (error) {
      Alert.alert(
        'Geocoding or Update Error',
        error.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.smallMap}
        initialRegion={{
          latitude: 50.7192,
          longitude: -1.8808,
          latitudeDelta: 0.6,
          longitudeDelta: 0.6,
        }}
        onPress={(event) => {
          const { latitude, longitude } = event.nativeEvent.coordinate;
          setUserLat(latitude);
          setUserLng(longitude);
        }}
      >
        {userLat && userLng && (
          <Marker coordinate={{ latitude: userLat, longitude: userLng }} />
        )}
      </MapView>
      {userLat && userLng && userAddress !== '' && (
        <View style={styles.addressBox}>
          <Text style={styles.addressText}>{userAddress}</Text>
        </View>
      )}

      <Pressable style={styles.updateButton} onPress={handleLocationSelect}>
        <Text style={styles.updateButtonText}>Update Location</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  smallMap: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
    marginVertical: 10,
  },
  updateButton: {
    width: '80%',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#4F7942',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressBox: {
    position: 'absolute',
    bottom: 130,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10,
    maxWidth: '90%',
    alignSelf: 'center',
  },
  addressText: {
    fontSize: 14,
    color: '#333',
  },
});
