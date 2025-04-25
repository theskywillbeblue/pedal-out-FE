import React from 'react';
import { View, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Create a component that uses color scheme to adjust icon colors
const TabIcon = ({ iconName }) => {
  const colorScheme = useColorScheme(); // Get the current color scheme (light or dark)

  // Define color choices for light and dark modes
  const iconColor = colorScheme === 'dark' ? '#fff' : '#000'; // White for dark mode, black for light mode

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', width: 60 }}>
      <Ionicons name={iconName} size={28} color={iconColor} />
    </View>
  );
};

export default TabIcon;
