import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import FloatingSearchBar from '../search';

// export const options = {
//     headerShown: false,
//   };

export default function TabOneScreen() {
  return (
    <View style={{ flex: 1, paddingTop: 100 }}>
      
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
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Placeholder Title</ThemedText>
      </ThemedView>
      <ThemedText>Placeholder Text</ThemedText>
      
    </ParallaxScrollView>
{/* render 3+ wide panels */}


{/*here we render a floating map button that opens up fullscreen interactive map */}


    </View>
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
  });


