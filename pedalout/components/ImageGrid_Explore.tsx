import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  rides: any[];
};

export default function ImageGridSquares({ rides }: Props) {

  return (
    <View style={styles.grid}>
      {rides.slice(0, 8).map((ride, index) => (
        <View key={index} style={styles.square}>
          <View style={styles.overlay1} />
          <Text style={styles.rideCardDetails}>
          <Text style={{fontSize: 19}}>{ride.title}</Text>
          {'\n'}
          {new Date(ride.ride_date).toLocaleDateString()}
          </Text>
        </View>
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
    backgroundColor: 'rgba(145, 120, 145, 0.3)',
    borderRadius: 8, // radius - borderWidth
  },

  square: {
    alignContent: 'center',
    width: '100%',
    height: 240,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    //borderWidth: 2,
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
