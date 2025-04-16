import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import FloatingSearchBar from '../../components/search';
import ImageGridSquares from '../../components/ImageGrid_Explore';
import { rgbaColor } from 'react-native-reanimated/lib/typescript/Colors';
import { SafeAreaView } from 'react-native';
export const options = {
  headerShown: false,
};

export default function TabOneScreen() {
  return (
  <SafeAreaView style={{ flex: 1 }}>
   
      <FloatingSearchBar />

      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={
          <IconSymbol
            size={310}
            color="#808080"
            name="chevron.left.forwardslash.chevron.right"
            style={styles.headerImage}
          />
        }>
<Text>
<ThemedText style={styles.title}>Rides Nearby</ThemedText>
</Text>
          <ThemedText style={styles.subtitle}>'user location'</ThemedText>
        <ImageGridSquares /> {/* Image grid component here */}

          </ParallaxScrollView>
          
        <ThemedView style={styles.titleContainer}>
          
        </ThemedView>
        
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    fontFamily: 'Helvetica',
  },
  default: {
    fontFamily: 'HelveticaRoundedBold',
    fontSize: 16,
    lineHeight: 24,
  }, 
  title: {
    fontFamily: 'HelveticaRoundedBold',
    fontSize: 25,
    lineHeight: 24,
  },
  subtitle: {
    fontFamily: 'HelveticaRoundedBold',
    color: 'gray',
    fontSize: 16,
    lineHeight: 15,
  },
});
