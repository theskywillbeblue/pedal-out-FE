import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { showHidden } from 'yargs';

export default function ImageGridSquares() {
  return (
    <View style={styles.grid}>
      <View style={styles.square}>
  <View style={styles.overlay1} />
  <Text style={styles.rideCardDetails}>
    {'Hamster Heath ' + '\u{1F6B4}' + '\n' + '\u{1F525}\u{1F525}\u{1F525}'}
  </Text>
</View>
      
      <View style={styles.square}></View>
      <View style={styles.square}></View>
      <ThemedText style={styles.default}>{'\u{1F6B4}'}{' Friends Rides'}</ThemedText>
            <View style={styles.square}></View>
      <View style={styles.square}></View>
      <View style={styles.square}></View>
      <View style={styles.square}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay1: {
    position: 'absolute',
    top: 2, bottom: 2, left: 2, right: 2, // match your borderWidth
    backgroundColor: 'rgba(128, 0, 128, 0.3)',
    borderRadius: 8, // radius - borderWidth
  },
  
  square: {
    alignContent: 'center',
    width: '100%',
    height: 180,
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
    gap: 30,
    paddingHorizontal: 0,
    paddingBottom: 20,
    marginTop: 0,
  },
  rideCardDetails: {
    fontFamily: 'HelveticaRoundedBold',
    color: '#FFF',
    opacity: 0.5,
    fontSize: 16,
    lineHeight: 24,
    position: 'absolute',
    bottom: 10,
    left: 20,
  },
  
  
    default: {
      fontFamily: 'HelveticaRoundedBold',
      fontSize: 16,
      lineHeight: 24,
    }
});
