import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from './ThemedView';

type Props = {
  rides: any[];
};

export default function RideCardList({ rides }: Props) {
  return (
    <ThemedView style={styles.grid}>
      {rides.slice(3, 12).map((ride) => (
        <TouchableOpacity
          key={ride.ride_id}
          onPress={() =>
            router.push({
              pathname: '/RideDetails',
              params: { ride: JSON.stringify(ride) },
            })
          }
        >
          <ImageBackground
            source={{ uri: ride.ride_img_url }}
            style={styles.square}
          >
            <View style={styles.overlayColour} />

            <ThemedText style={styles.rideCardDetails}>
              <ThemedText style={{ fontSize: 19 }}>{ride.title}</ThemedText>
              {'\n'}
              {new Date(ride.ride_date).toLocaleDateString()}
            </ThemedText>
          </ImageBackground>
        </TouchableOpacity>
      ))}
  
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  overlayColour: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(32, 68, 39, 0.42)',
  },

  square: {
    alignContent: 'center',
    height: 240,
    borderRadius: 16,
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  grid: {
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 17,
    paddingHorizontal: 0,
    marginTop: 0,
  },
  rideCardDetails: {
    fontFamily: 'HelveticaRoundedBold',
    opacity: 0.7,
    fontSize: 14,
    position: 'absolute',
    bottom: 16,
    left: 20,
  },

  default: {
    fontFamily: 'HelveticaRoundedBold',
    fontSize: 16,
  },
});
