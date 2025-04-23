import React from 'react';
import { View, Pressable, StyleSheet, Button } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParticipantsArray from './ParticipantsArray';

function RideDetailsPanel() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'text');
  const invertedBorderColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');

  return (
    <ThemedView style={styles.container}>
      
        <ThemedText style={[styles.title, { borderColor }]}>
          Ride Title Goes Here
        </ThemedText>

        <ThemedText style={[styles.desc2, { borderColor }]}>
          address from geocode
        </ThemedText>

        <ThemedText style={[styles.desc2, { borderColor }]}>
          9th Apr 2025 6:00pm
        </ThemedText>

        <ThemedText style={[styles.desc2, { borderColor }]}>
          Tags: template literal
        </ThemedText>

        <View style={[styles.divider, {borderBottomColor: invertedBorderColor}]} />

        <ThemedText style={[styles.description, { borderColor }]}>
          Ride Description Goes Here
        </ThemedText>
        <ThemedText style={[styles.desc2, { borderColor }]}>
          friends list from Chat

        </ThemedText>

        <ParticipantsArray />

        <Button title="Join" />
      </ThemedView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  title: {
    fontSize: 16,
    width: '100%',
    paddingVertical: 0,
    paddingHorizontal: 6,
    borderRadius: 6,
    lineHeight: 20,
  },
  desc2: {
    fontSize: 12,
    width: '100%',
    height: 25,
    borderRadius: 6,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  description: {
    fontSize: 14,
    width: '100%',
    height: 50,
    borderRadius: 6,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  divider: {
    borderBottomWidth: 1,   // Thickness of the line
    marginVertical: 12,
    width: '100%',
  },

  buttoncontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 0,
  },
  buttonplaceholder: {
    width: '48%',
    height: 36,
    borderWidth: 0.5,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonplaceholdertext: {
    fontSize: 14,
  },
  modalContainer: {
    marginTop: 2,
  },
  modalContent: {
    borderRadius: 8,
    padding: 16,
  },
});


export default RideDetailsPanel;
