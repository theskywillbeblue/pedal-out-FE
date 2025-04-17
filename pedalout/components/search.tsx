import { StyleSheet, View, TextInput } from 'react-native';
import { useColorScheme } from "@/hooks/useColorScheme";

export default function FloatingSearchBar() {
  const colorScheme = useColorScheme();

  // Define background, text color, and placeholder color based on the color scheme
  const backgroundColor = colorScheme === "dark" ? "#000" : "#fff";  // Dark mode: black background, Light mode: white background
  const textColor = colorScheme === "dark" ? "#fff" : "#000";  // Dark mode: white text, Light mode: black text
  const placeholderColor = colorScheme === "dark" ? "#aaa" : "#888";  // Dark mode: light grey placeholder, Light mode: dark grey placeholder

  return (
    <View style={[styles.floatingSearchContainer, { backgroundColor }]}>
      <TextInput
        placeholder="📌 Search ..."
        placeholderTextColor={placeholderColor}
        style={[styles.searchInput, { color: textColor }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  floatingSearchContainer: {
    fontFamily: 'HelveticaRounded',
    position: 'absolute',
    top: 30,
    left: 20,
    right: 20,
    zIndex: 1000,
    borderRadius: 12,
    paddingHorizontal: 2,
    paddingVertical: 2,
    // Remove any shadow properties here
    shadowColor: 'transparent', // Ensures no shadow is applied
    shadowRadius: 0,
    shadowOpacity: 0,
    elevation: 0, // Ensures no shadow on Android
  },
  searchInput: {
    fontFamily: 'HelveticaRoundedBold',
    textAlign: 'left',
    fontSize: 16,
    paddingLeft: 12,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    fontFamily: 'HelveticaRoundedBold',
  },
});
