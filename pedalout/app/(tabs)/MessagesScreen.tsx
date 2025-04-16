import { StyleSheet, ScrollView, Text, View } from 'react-native';
import FloatingSearchBar from '../../components/search';
import ChatComponent from '@/components/Chat';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function TabFourScreen() {
	return (
	
			<SafeAreaProvider>
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
			</SafeAreaProvider>
		
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
  }
})
