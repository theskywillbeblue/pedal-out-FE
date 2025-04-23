import React from 'react';
import { View, Pressable, StyleSheet, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParticipantsArray from './ParticipantsArray';
import { router, useLocalSearchParams } from 'expo-router';
import { ScreenHeight } from '@rneui/themed/dist/config';
import { useState } from 'react';
import TouchableOpacity from 'react-native-gesture-handler';

function RideDetailsPanel() {
  const [chatImages, setChatImages] = useState<string[]>([]);

  const { ride } = useLocalSearchParams();
  const parsedRide = JSON.parse(ride as string);
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'text');
  const invertedBorderColor = useThemeColor(
    { light: '#000', dark: '#fff' },
    'text',
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={[styles.title, { borderColor }]}>
        {parsedRide.title}
      </ThemedText>

      <ThemedText style={[styles.desc2, { borderColor }]}>
        address from geocode ????
      </ThemedText>

      <ThemedText style={[styles.desc2, { borderColor }]}>
        {parsedRide.ride_date} {'\n'} {parsedRide.ride_time}
      </ThemedText>

      <ThemedText style={[styles.desc2, { borderColor }]}>
        Discipline: {parsedRide.disciplines}
      </ThemedText>

      <View
        style={[styles.divider, { borderBottomColor: invertedBorderColor }]}
      />

      <ThemedText style={[styles.description, { borderColor }]}>
        {parsedRide.description}
      </ThemedText>

      <ThemedText style={[styles.desc2, { borderColor }]}>
        {parsedRide.participants.length} participants
      </ThemedText>

        <ParticipantsArray />
      {/* <View style={styles.buttoncontainer}>
          <Pressable style={[styles.buttonplaceholder, { borderColor }]}>
            <ThemedText style={[styles.buttonplaceholdertext, { color: textColor }]}>
              useless button
            </ThemedText>
          </Pressable>
        </View> */}

      <ThemedView style={styles.spaceContainer} />

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
    borderBottomWidth: 1, // Thickness of the line
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
  spaceContainer: {
    marginTop: 2,
    height: 20,
  },
  modalContent: {
    borderRadius: 8,
    padding: 16,
  },
  scrollOverlay: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingVertical: 10,
  },
  avatarContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 16,
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: '#ccc',
  },
});

export default RideDetailsPanel;
