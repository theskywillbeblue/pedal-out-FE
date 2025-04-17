import { StyleSheet, View, SafeAreaView, Text, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import FloatingSearchBar from '../../components/search';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getFriends } from '../../api.js';

export default function TabFiveScreen() {
  // const [friends, setFriends] = useState([]);
  // const [isLoading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // useEffect(() => {
  //   getFriends()
  //     .then((res) => {
  //       setFriends(res.friends);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  // if (isLoading) {
  //   return <Text>Fetching your friends...</Text>;
  // }
  // if (error) {
  //   return <Text>Houston, we have a problem!</Text>;
  // }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <FloatingSearchBar />
      </View>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Friends</ThemedText>
      </ThemedView>
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.avatarContainer}
      >
        <View style={styles.titleSpacer} />

        <View style={styles.avatarRow}>
          <View style={styles.avatarPlaceholder} />
          <Text style={styles.avatarName}>Friend Name</Text>
        </View>
        <View style={styles.avatarRow}>
          <View style={styles.avatarPlaceholder} />
          <Text style={styles.avatarName}>Friend Name</Text>
        </View>
        <View style={styles.avatarRow}>
          <View style={styles.avatarPlaceholder} />
          <Text style={styles.avatarName}>Friend Name</Text>
        </View>
        <View style={styles.avatarRow}>
          <View style={styles.avatarPlaceholder} />
          <Text style={styles.avatarName}>Friend Name</Text>
        </View>
        <View style={styles.avatarRow}>
          <View style={styles.avatarPlaceholder} />
          <Text style={styles.avatarName}>Friend Name</Text>
        </View>
        <View style={styles.avatarRow}>
          <View style={styles.avatarPlaceholder} />
          <Text style={styles.avatarName}>Friend Name</Text>
        </View>

  
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: 80,
    paddingHorizontal: 16,
    paddingBottom: 10,
    paddingLeft: 23,
    zIndex: 10,
  },
  titleSpacer: {
    marginTop: 40,
  },

  title: {
    fontFamily: 'HelveticaRoundedBold',
    fontSize: 25,
    lineHeight: 30,
    marginBottom: 8,
  },
  avatarContainer: {
    paddingHorizontal: 16,
    flexDirection: 'column',
    marginLeft: 15,
    gap: 14,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 55,
    backgroundColor: '#ccc',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center', 
    gap: 20
  },
  avatarName: {
    fontFamily: 'HelveticaRounded',
    fontSize: 20,
    fontWeight: 700,
    color: '#666',
  },
});