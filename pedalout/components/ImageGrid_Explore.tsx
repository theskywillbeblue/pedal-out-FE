import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { router } from 'expo-router';

type Props = {
  rides: any[];
};

export default function ImageGridSquares({ rides }: Props) {
  return (
    <View style={styles.grid}>
      {rides.slice(0, 8).map((ride) => (
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
            source={{
              uri: 'https://media.istockphoto.com/id/1402134774/photo/professional-road-cyclist-on-a-training-ride.jpg?s=612x612&w=0&k=20&c=CB2o_DXMgH15MLa1CEqWwZVtVb3rpRgejV3UFnUwF_U=',
            }} // update to ride.ride_img_url when api is updated
            style={styles.square}
            imageStyle={{ borderRadius: 10 }}
          >
            <View style={styles.overlay1} />

            <ThemedText style={styles.rideCardDetails}>
              <ThemedText style={{ fontSize: 19 }}>{ride.title}</ThemedText>
              {'\n'}
              {new Date(ride.ride_date).toLocaleDateString()}
            </ThemedText>
          </ImageBackground>
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
    top: 0,
    bottom: 0,
    left: 0,
    right: 0, // match your borderWidth
    backgroundColor: 'rgba(1, 10, 3, 0.42)',
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
    gap: 15,
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
