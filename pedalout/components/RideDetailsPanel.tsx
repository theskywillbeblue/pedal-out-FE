import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemedText } from './ThemedText';

import { useThemeColor } from '@/hooks/useThemeColor'; // Import the useThemeColor hook
import { ThemedView } from '@/components/ThemedView'; // Import ThemedView

function RideDetailsPanel() {
 
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
 

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      
      <ThemedText> Test</ThemedText>
      
      <View style={{ height: 180 }} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    container: {
    },
    title: {
        fontSize: 16,

        textAlignVertical: 'top',
        width: '90%',
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        marginBottom: 8, // Reduced from 16
      },
    input: {
        width: '75%',
      textAlignVertical: 'top',
      borderWidth: 1,
      borderRadius: 6,
      padding: 10,
      marginBottom: 8, // Reduced from 16
      fontSize: 12,
    },
    tags: {
        width: '70%',
        textAlignVertical: 'top',
        borderWidth: 1,
        borderRadius: 6,
        padding: 5,
        marginBottom: 8,
        fontSize: 12,
      },
    description: {
        fontSize: 12,

        textAlignVertical: 'top',
        width: '100%',
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        marginBottom: 8, // Reduced from 16
      },
    dateText: {
      fontSize: 11,
      padding: 10,
    },
    datePicker: {
        width: '70%',
        
      borderWidth: 1,
      borderRadius: 6,
      marginBottom: 8, // Reduced from 16
    },
    
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  placeholderButton: {
    flex: 1,
  },
  button: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    alignItems: 'center',
    flex: 0.3,
    marginHorizontal: 8,
  },
  button2: {
    backgroundColor: '#24A0ED',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    flex: 0.8,
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonTextDark: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RideDetailsPanel;
