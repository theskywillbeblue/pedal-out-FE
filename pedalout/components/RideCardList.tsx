import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Text,
} from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from './ThemedView';
import { Ionicons } from '@expo/vector-icons';

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

            <View style={styles.iconContainer}>
              <Ionicons name="people-circle-outline" size={24} color="white" />
              <ThemedText style={styles.participantCount}>{ride.participants.length}</ThemedText>            
            </View>
            <Text style={styles.rideCardDetails}>
              <Text style={styles.subtitle}>{ride.title}</Text>
              {'\n'}
              {new Date(ride.ride_date).toLocaleDateString()}
            </Text>
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
    color: '#fff',
    padding: 4,
  },
  subtitle: {
    fontFamily: 'HelveticaRoundedBold',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 15,
    opacity: 0.8,
  },
  participantCount: {
    color: '#fff'
  },
});
