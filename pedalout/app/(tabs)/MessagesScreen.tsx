import { StyleSheet, ScrollView, Text, View, Platform} from 'react-native';
import FloatingSearchBar from '../../components/search';
import ChatComponent from '@/components/Chat';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function TabFourScreen() {
  return (
    
    <SafeAreaView style={styles.safeArea}>
      <FloatingSearchBar />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollOverlay}
        contentContainerStyle={styles.avatarContainer}
      >
        <View style={styles.avatarPlaceholder} />
        <View style={styles.avatarPlaceholder} />
        <View style={styles.avatarPlaceholder} />
        <View style={styles.avatarPlaceholder} />
        <View style={styles.avatarPlaceholder} />
      </ScrollView>
      <ChatComponent></ChatComponent>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  safeArea: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? 24 : 0,
  },
});
