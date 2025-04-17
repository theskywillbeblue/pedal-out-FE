import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function UserGallery({ navigation }: any) {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Check out your gallery</Text>

      <Image
        source={{
          uri: 'https://cdn.pixabay.com/photo/2019/06/13/06/02/travel-4270800_1280.png',
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Image
        source={{
          uri: 'https://cdn.pixabay.com/photo/2020/06/10/13/30/nature-5282719_1280.png',
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Image
        source={{
          uri: 'https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_1280.png',
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Image
        source={{
          uri: 'https://cdn.pixabay.com/photo/2020/03/28/15/30/mountain-4977474_1280.png',
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Image
        source={{
          uri: 'https://cdn.pixabay.com/photo/2022/11/22/22/38/mountain-7610767_1280.png',
        }}
        style={styles.image}
        resizeMode="contain"
      />

      <Button title="Go Back" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
  image: {
    width: 400,
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
  },
});
