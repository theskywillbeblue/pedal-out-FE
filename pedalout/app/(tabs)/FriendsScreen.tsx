import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { useEffect } from 'react';
import FloatingSearchBar from '../../components/search';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import {getFriends} from'../../api.js'

export default function TabFiveScreen() {

  const [friends, setFriends] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getFriends()
      .then((res) => {
        setFriends(res.friends);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Text>Fetching your friends...</Text>;
  }
  if (error) {
    return <Text>Houston, we have a problem!</Text>;
  }



  return (
 <SafeAreaView style={{ flex: 1, paddingTop: 100 }}>

  <View style={styles.floatingWrapper}>
    <FloatingSearchBar />
  </View>


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
  },
  floatingWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999, // make sure it's higher than anything else
  },
  floatingSearchContainer: {
    marginTop: 23,
    marginHorizontal: 20,
    fontFamily: 'HelveticaRounded',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
