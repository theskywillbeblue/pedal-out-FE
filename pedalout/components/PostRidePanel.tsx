import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Enter title" />


      {/* Date Picker Trigger */}
      <Pressable onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
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
      <Pressable onPress={() => setShowTimePicker(true)}>
        <Text style={styles.dateText}>{formattedTime}</Text>
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

<TextInput style={[styles.input, { height: 120 }]} placeholder="Enter description" multiline />

      <View style={styles.buttonContainer}>
        <View style={styles.placeholderButton} /> 

        <Pressable style={styles.button}>
        <Text style={styles.buttonTextDark}>{'\u{1F465}+'}</Text>
        </Pressable>

        <Pressable style={styles.button2}>
          <Text style={styles.buttonText}>Post</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 16,
    color: '#ccc',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  placeholderButton: {
    flex: 1, // Takes up space but is invisible
  },
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: 'fff',
    padding: 10,
    alignItems: 'center',
    flex: 0.3, // Makes buttons share equal width
    marginHorizontal: 8, // Adds space between buttons
  },
  button2: {
    backgroundColor: '#24A0ED',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    flex: 0.8, // Makes buttons share equal width
    marginHorizontal: 8, // Adds space between buttons
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center', // Centers text in the button
  },
  buttonTextDark: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center', // Centers text in the button
  },
});

export default PostRide;
