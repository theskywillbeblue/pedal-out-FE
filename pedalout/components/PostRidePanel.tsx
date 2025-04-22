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

  return (
    <ScrollView className="flex flex-col gap-4">
      {/* ... all your form fields ... */}
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
            <Text>Title:</Text>
            <TextInput
              style={{ borderBottomWidth: 1, marginBottom: 20 }}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
            />

            <Text>Description:</Text>
            <TextInput
              style={{ borderBottomWidth: 1, marginBottom: 20 }}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
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

            <Text>Public Ride:</Text>
            {/* <Picker
              onValueChange={handleChange('isPublic')}
              onBlur={handleBlur('isPublic')}
              selectedValue={values.isPublic}
            >
              <Picker.Item label="Yes" value="true" />
              <Picker.Item label="No" value="false" />
            </Picker> */}
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

            <Text>Date:</Text>
            <Button
              title={values.date.toDateString()}
              onPress={() => setShowDatePicker(true)}
            />
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

            <Text>Time:</Text>
            <Button
              title={values.time.toTimeString().split(' ')[0]}
              onPress={() => setShowTimePicker(true)}
            />
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
    </ScrollView>
  );
}
