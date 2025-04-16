import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ImageGridSquares() {
  return (
    <View style={styles.grid}>
      <View style={styles.square}></View>
      <View style={styles.square}></View>
      <View style={styles.square}></View>
      <ThemedText style={styles.default}>🚴 Friends Rides</ThemedText>
      <View style={styles.square}></View>
      <View style={styles.square}></View>
      <View style={styles.square}></View>
      <View style={styles.square}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 30,
    paddingHorizontal: 0,
    paddingBottom: 20,
    marginTop: 20,
  },
  square: {
    alignContent: 'center',
    width: '100%', // Make each square take up 30% of the screen width
    height: 180, // Set a fixed height
    backgroundColor: '#f0f0f0', // Light gray background
    borderRadius: 10, // Rounded corners
    borderWidth: 2, // Border around the rectangle
    borderColor: '#ccc', // Border color
  },
  
    default: {
      fontFamily: 'HelveticaRoundedBold',
      fontSize: 16,
      lineHeight: 24,
    }
});
