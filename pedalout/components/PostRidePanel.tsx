import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Button,
  Alert,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { postRide } from '../api';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Ionicons } from '@expo/vector-icons';

type Coordinates = {
  latitude: number;
  longitude: number;
};

export default function PostRide(props: Coordinates) {
  // const { control, handleSubmit, reset } = useForm<FormData>({
  //   defaultValues: {
  //     title: '',
  //     description: '',
  //     tags: '',
  //   },
  // });
  // const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleFormSubmit = async (values: any) => {
    try {
      console.log(values, '<<<< values');
      const rideData = {
        author: 'some-user-id-or-name', // replace with actual logic
        title: values.title,
        description: values.description,
        discipline: values.discipline, // can make this dynamic
        is_public: values.isPublic,
        ride_date: values.date,
        ride_time: values.time,
        ride_location: {
          lat: props.latitude,
          lng: props.longitude,
        },
      };
      console.log(rideData, '<<<< rideData');

      // await postRide(rideData);
      Alert.alert('Success', 'Ride posted!');
      // resetForm();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not post ride.');
    }
  };

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'text'); // Theme border color

  return (
    <ThemedView className="flex flex-col gap-4">
      <Formik
        initialValues={{
          title: '',
          description: '',
          discipline: 'Downhill',
          isPublic: true,
          date: new Date(),
          time: new Date(),
        }}
        onSubmit={handleFormSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
        }) => (
          <View style={{ padding: 20 }}>
            <ThemedTextInput
              style={[styles.title, { borderColor }]}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              placeholder="Enter Title"
              placeholderTextColor={textColor}
            />

            <ThemedTextInput
              style={[styles.description, { borderColor }]}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              placeholder="Enter Description"
              placeholderTextColor={textColor}
            />

            <Text>Discipline:</Text>
            <Picker
              onValueChange={handleChange('discipline')}
              onBlur={handleBlur('discipline')}
              selectedValue={values.discipline}
            >
              <Picker.Item label="Downhill" value="Downhill" />
              <Picker.Item label="Gravel" value="Gravel" />
              <Picker.Item label="Mountain" value="Mountain" />
              <Picker.Item label="Enduro" value="Enduro" />
              <Picker.Item label="Cross Country" value="Cross Country" />
              <Picker.Item label="Park" value="Park" />
              <Picker.Item label="Casual" value="Casual" />
            </Picker>

            <Pressable
              onPress={() => setFieldValue('isPublic', !values.isPublic)}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Ionicons
                name={values.isPublic ? 'checkbox' : 'square-outline'}
                size={24}
                color={values.isPublic ? '#007AFF' : '#aaa'}
              />
              <Text style={{ marginLeft: 8 }}>Public Ride</Text>
            </Pressable>

            <Pressable
              style={[styles.datePicker, { height: 35, borderColor }]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{values.date.toDateString()}</Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={values.date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(Platform.OS === 'ios');
                  if (selectedDate) {
                    setFieldValue('date', selectedDate);
                  }
                }}
              />
            )}

            <Pressable
              style={[styles.datePicker, { height: 35, borderColor }]}
              onPress={() => setShowTimePicker(true)}
            >
              <Text>{values.time.toTimeString().split(' ')[0]}</Text>
            </Pressable>
            {showTimePicker && (
              <DateTimePicker
                value={values.time}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  setShowTimePicker(Platform.OS === 'ios');
                  if (selectedTime) {
                    setFieldValue('time', selectedTime);
                  }
                }}
              />
            )}

            <View style={{ marginTop: 20 }}>
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          </View>
        )}
      </Formik>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {},
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
  discipline: {
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
