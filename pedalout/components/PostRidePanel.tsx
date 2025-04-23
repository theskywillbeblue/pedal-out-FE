import React, { useState, useContext } from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  Button,
  Alert,
  Platform,
  View,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { postRide } from '../api';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../app/context/UserContext';
import DropDownPicker from 'react-native-dropdown-picker';
import { router } from 'expo-router';
import { format } from 'date-fns';
import * as Yup from 'yup';
import { TouchableOpacity } from 'react-native-gesture-handler';

type PostRideProps = {
  latitude: number;
  longitude: number;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const RideValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Ride title is required')
    .min(10, 'Title must be at least 10 characters')
    .max(40, 'Title must be less than 40 characters'),

  description: Yup.string()
    .required('Description is required')
    .min(30, 'Description must be at least 30 characters')
    .max(300, 'Description must be less than 300 characters'),

  date: Yup.date()
    .required('Date is required')
    .min(new Date(), 'Date cannot be in the past'),
});

export interface RideFormValues {
  title: string;
  description: string;
  discipline: string;
  isPublic: boolean;
  date: Date;
  time: Date;
}

export default function PostRide(props: PostRideProps) {
  const currentUser = useContext(UserContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [hasPickedTime, setHasPickedTime] = useState(false);
  const [hasPickedDate, setHasPickedDate] = useState(false);
  const [disciplines, setDisciplines] = useState([
    { label: 'Downhill', value: 'Downhill' },
    { label: 'Gravel', value: 'Gravel' },
    { label: 'Enduro', value: 'Enduro' },
    { label: 'Cross Country', value: 'Cross Country' },
    { label: 'Park', value: 'Park' },
    { label: 'Casual', value: 'Casual' },
  ]);

  const handleFormSubmit = async (values: any) => {
    try {
      const rideData = {
        author: currentUser.profile.username,
        title: values.title,
        description: values.description,
        discipline: values.discipline,
        is_public: values.isPublic,
        ride_date: values.date.toDateString(),
        ride_time: values.time.toTimeString(),
        ride_location: {
          lat: props.latitude,
          lng: props.longitude,
        },
      };

      await postRide(rideData);
      Alert.alert('Success', 'Ride posted!');

      router.push('/(tabs)');
    } catch (error) {
    
      Alert.alert('Error', 'Could not post ride.');
    }
  };

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'text');

  return (
    <ThemedView style={styles.formContainer}>
      <Formik
        initialValues={{
          title: '',
          description: '',
          discipline: null,
          isPublic: true,
          date: new Date(),
          time: new Date(),
        }}
        validationSchema={RideValidationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <ThemedView style={{ padding: 20 }}>
            {/* Ride Title */}
            <ThemedTextInput
              style={[styles.title, { borderColor }]}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              placeholder="Ride Title"
              placeholderTextColor={textColor}
            />
            {errors.title && touched.title && (
              <Text style={styles.errorText}>{errors.title}</Text>
            )}

            {/* Ride Discipline */}
            <DropDownPicker
              open={props.open}
              value={values.discipline}
              items={disciplines}
              setOpen={props.setOpen}
              setValue={(callback) => {
                const value = callback(values.discipline);
                setFieldValue('discipline', value);
              }}
              setItems={setDisciplines}
              placeholder={'Pick a discipline'}
              placeholderStyle={{
                color: '#000',
                fontStyle: 'italic',
              }}
              horizontal={true}
              style={styles.dropdown}
            />

            {/* Ride Description */}
            <ThemedTextInput
              style={[styles.description, { borderColor }]}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              placeholder="Ride Description"
              placeholderTextColor={textColor}
              multiline={true}
              numberOfLines={4}
            />
            {touched.description && errors.description && (
              <Text style={styles.errorText}>{errors.description}</Text>
            )}

            {/*  Public Checkbox */}
            <Pressable
              onPress={() => setFieldValue('isPublic', !values.isPublic)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}
            >
              <Ionicons
                name={!values.isPublic ? 'checkbox' : 'square-outline'}
                size={24}
                color={!values.isPublic ? '#007AFF' : '#aaa'}
              />
              <Text style={[{ marginLeft: 8, color: textColor }]}>
                Private Ride (only visible to followers)
              </Text>
            </Pressable>

            {/* Date Picker Button */}
            <View style={styles.dateTimeContainer}>
              <Pressable
                style={[styles.dateTimePickers, { borderColor }]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={[styles.inputHeadings, { color: textColor }]}>
                  {hasPickedDate
                  ? format(values.date, 'EEE MMM dd yyyy')
                  : 'Date'}
                </Text>
              </Pressable>

              {/* Time Picker Button */}
              <Pressable
                style={[styles.dateTimePickers, { borderColor }]}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={[styles.inputHeadings, { color: textColor }]}>
                  {hasPickedTime
                    ? format(values.time, 'HH:mm')
                    : 'Time'}
                </Text>
              </Pressable>
            </View>

            <View style={styles.dateErrorContainer}>
              <View style={{ flex: 1 }}>
                {touched.date && errors.date && (
                  <Text style={styles.errorText}>{errors.date}</Text>
                )}
              </View>
            </View>

            {/* Android Date Picker */}
            {showDatePicker && Platform.OS === 'android' && (
              <DateTimePicker
                value={values.date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowTimePicker(false);
                  if (selectedDate) {
                    setHasPickedDate(true);
                    setFieldValue('date', selectedDate);
                  }
                }}
              />
            )}

            {/* iOS Date Picker in Modal */}
            {Platform.OS === 'ios' && (
              <Modal
                visible={showDatePicker}
                transparent={true}
                animationType="slide"
              >
                <View style={styles.modalContainer}>
                  <View style={[styles.modalContent, { backgroundColor }]}>
                    <Text style={[styles.modalTitle, { color: textColor }]}>
                      Select Date
                    </Text>
                    <DateTimePicker
                      value={values.date}
                      mode="date"
                      display="spinner"
                      onChange={(event, selectedDate) => {
                        if (selectedDate) {
                          setHasPickedDate(true);
                          setFieldValue('date', selectedDate);
                        }
                      }}
                      style={{ width: '100%' }}
                    />
                    <View style={styles.buttonContainer}>
                      <Button
                        title="Cancel"
                        onPress={() => setShowDatePicker(false)}
                      />
                      <Button
                        title="Done"
                        onPress={() => setShowDatePicker(false)}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            )}

            {/* Android Time Picker */}
            {showTimePicker && Platform.OS === 'android' && (
              <DateTimePicker
                value={values.time}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false);
                  if (selectedTime) {
                    setHasPickedTime(true);
                    setFieldValue('time', selectedTime);
                  }
                }}
              />
            )}

            {/* iOS Time Picker in Modal */}
            {Platform.OS === 'ios' && (
              <Modal
                visible={showTimePicker}
                transparent={true}
                animationType="slide"
              >
                <View style={styles.modalContainer}>
                  <View style={[styles.modalContent, { backgroundColor }]}>
                    <Text style={[styles.modalTitle, { color: textColor }]}>
                      Select Time
                    </Text>
                    <DateTimePicker
                      value={values.time}
                      mode="time"
                      display="spinner"
                      onChange={(event, selectedTime) => {
                        if (selectedTime) {
                          setHasPickedTime(true);
                          setFieldValue('time', selectedTime);
                        }
                      }}
                      style={{ width: '100%' }}
                    />
                    <View style={styles.buttonContainer}>
                      <Button
                        title="Cancel"
                        onPress={() => setShowTimePicker(false)}
                      />
                      <Button
                        title="Done"
                        onPress={() => setShowTimePicker(false)}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            )}

<TouchableOpacity
  onPress={handleSubmit}
  style={{
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 20,
    alignSelf: 'center',
    width: '70%',
  }}
>
  <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>Post Ride!</Text>
</TouchableOpacity>
          </ThemedView>
        )}
      </Formik>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
  },
  title: {
    fontSize: 16,
    textAlignVertical: 'top',
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlignVertical: 'top',
    width: '100%',
    height: 80,
    borderWidth: 0.5,
    borderRadius: 6,
    padding: 10,
    marginBottom: 6,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 8
  },
  dateTimePickers: {
    width: '48%',
    height: 40,
    borderWidth: 0.5,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputHeadings: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 5,
  },
  dateErrorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdown: {
    height: 40,
    borderWidth: 0.5,
    borderRadius: 6,
    padding: 10,
    marginBottom: 25,
  },
});
