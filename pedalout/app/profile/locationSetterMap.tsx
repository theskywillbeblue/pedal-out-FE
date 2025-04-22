import React, { useLayoutEffect, useContext, useState } from 'react';
import { View, StyleSheet, Pressable, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { UserContext } from '../context/UserContext';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';
import Geocoder from 'react-native-geocoder';

export default function LocSetMap() {
  const navigation = useNavigation();
  const { user, profile, refreshProfile } = useContext(UserContext);
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  var pos = {
    lat: 40.7809261,
    lng: -73.9637594
  };
  
  Geocoder.geocodePosition(pos).then(res => {
      alert(res[0].formattedAddress);
  })
  .catch(error => alert(error));

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

    const { error } = await supabase
      .from('user_profile')
      .update({
        user_coordinate: { lat: userLat, lng: userLng },
      })
      .eq('user_id', user.id);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Details updated!');
      await refreshProfile();
      router.back();
    }

    setLoading(false);
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
        {userLat && userLng ? (
          <Marker coordinate={{ latitude: userLat, longitude: userLng }} />
        ) : null}
      </MapView>
  
      <Pressable style={styles.updateButton} onPress={handleLocationSelect}>
        <Text style={styles.updateButtonText}>Update Location</Text>
      </Pressable>
    </View>
  );
};

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
})
