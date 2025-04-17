import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemedTextInput } from '@/components/ThemedTextInput'; // Import ThemedTextInput
import { useThemeColor } from '@/hooks/useThemeColor'; // Import the useThemeColor hook
import { ThemedView } from '@/components/ThemedView'; // Import ThemedView

function PostRide() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || date;
    setShowTimePicker(false);
    setDate(currentTime);
  };

  // Format time to only show hours and minutes
  const formattedTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'text'); // Theme border color

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      {/* Input for Title */}
      <ThemedTextInput
        style={[styles.title, { borderColor }]} // Border color based on theme
        placeholder="Enter title"
        placeholderTextColor={textColor}
      />

<ThemedTextInput
        style={[styles.tags, { height: 35, borderColor }]} // Border color based on theme
        placeholder="Tags"
        placeholderTextColor={textColor}
      />

      {/* Date Picker Trigger */}
      <Pressable onPress={() => setShowDatePicker(true)} style={[styles.datePicker, { height: 35, borderColor }]}>
        <Text style={[styles.dateText, { color: textColor }]}>{date.toLocaleDateString()}</Text>
      </Pressable>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Time Picker Trigger */}
      <Pressable onPress={() => setShowTimePicker(true)} style={[styles.datePicker, { height: 35, borderColor }]}>
        <Text style={[styles.dateText, { color: textColor }]}>{formattedTime}</Text>
      </Pressable>

      {/* Time Picker Modal */}
      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}

      {/* Input for Description */}
      <ThemedTextInput
        style={[styles.description, { height: 60, borderColor }]} // Border color based on theme
        placeholder="Enter description"
        placeholderTextColor={textColor}
        multiline
      />

      <View style={styles.buttonContainer}>
        <View style={styles.placeholderButton} />

        <Pressable style={styles.button}>
          <Text style={[styles.buttonTextDark, { color: textColor }]}>
            {'\u{1F465}+'}
          </Text>
        </Pressable>

        <Pressable style={styles.button2}>
          <Text style={styles.buttonText}>Post</Text>
        </Pressable>
       

      </View>
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

export default PostRide;
