import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Props = {
  rides: any[];
};

export default function ImageGridSquares({ rides }: Props) {

  const navigation = useNavigation();

  return (
    <View style={styles.grid}>

      {rides.slice(0, 8).map((ride) => (
        <TouchableOpacity onPress={() => navigation.navigate('RideDetails')}>
        <View key={ride.id} style={styles.square}>
          <View style={styles.overlay1} />
          <ThemedText style={styles.rideCardDetails}>
          <ThemedText style={{fontSize: 19}}>{ride.title}</ThemedText>
          {'\n'}
          {new Date(ride.ride_date).toLocaleDateString()}
          </ThemedText>
        </View>
        </TouchableOpacity>
      ))}
      {rides.length === 0 && (
        <ThemedText style={styles.default}>
          {'\u{1F6B4}'} No rides to show
        </ThemedText>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  overlay1: {
    position: 'absolute',
    top: 2,
    bottom: 2,
    left: 2,
    right: 2, // match your borderWidth
    backgroundColor: 'rgba(36, 54, 40, 0.3)',
    borderRadius: 8, // radius - borderWidth
  },

  square: {
    alignContent: 'center',
    width: '100%',
    height: 240,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    borderColor: '#ccc',
    overflow: 'hidden',
    position: 'relative', // Needed for absolute children
  },
  grid: {
    overflow: 'hidden',
    position: 'relative', // needed for absolute children

    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 0,
    paddingBottom: 20,
    marginTop: 0,
  },
  rideCardDetails: {
    fontFamily: 'HelveticaRoundedBold',
    color: '#000',
    opacity: 0.5,
    fontSize: 14,
    lineHeight: 24,
    position: 'absolute',
    bottom: 10,
    left: 20,
  },

  default: {
    fontFamily: 'HelveticaRoundedBold',
    fontSize: 16,
    lineHeight: 24,
  },
});
