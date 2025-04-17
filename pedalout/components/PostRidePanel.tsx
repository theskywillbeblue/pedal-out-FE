import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { postRide } from '../api';
import { ScrollView } from 'react-native-gesture-handler';

export default function PostRide() {
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
      tags: '',
    },
  });
  const [date, setDate] = useState(new Date());
  const onSubmit = async (data: FormData) => {
    try {
      const rideData = {
        author: 'some-user-id-or-name', // replace with actual logic
        title: data.title,
        description: data.description,
        discipline: 'road', // or get from form
        isPublic: true,
        ride_date: date.toISOString().split('T')[0],
        ride_time: date.toTimeString().split(' ')[0],
        ride_location: data.tags,
      };
      await postRide(rideData);
      Alert.alert('Success', 'Ride posted!');
      reset();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not post ride.');
    }
  };
  return (
    <ScrollView className="flex flex-col gap-4">
      {/* ... all your form fields ... */}
      <Button title="Post Ride" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
}
