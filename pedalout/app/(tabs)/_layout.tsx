import { Tabs } from 'expo-router';
import React from 'react';
import { View, Platform, SafeAreaView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HapticTab } from '@/components/HapticTab';
import { useColorScheme } from '@/hooks/useColorScheme';

const TabIcon = ({ iconName, color, focused }) => {
  const getIconColor = () => {
    // If the tab is focused, set it to a lighter grey for visibility
    if (focused) {
      return '#555'; // Slightly darker grey for better visibility in both themes
    }
    return color; // Default color for unfocused tabs
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        transform: [{ translateY: -4 }], // shift icon up a bit
      }}
    >
      <Ionicons name={iconName} size={30} color={getIconColor()} />
    </View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const screenOptions = {
    headerShown: false,
    tabBarActiveTintColor: '#FFF',
    tabBarButton: HapticTab,
    tabBarStyle: {
      height: Platform.OS === 'android' ? 60 : 60,
      paddingTop: 0,
      paddingBottom: Platform.OS === 'android' ? 20 : 60,
      position: 'relative',
      borderTopWidth: 0,
      backgroundColor: colorScheme === 'dark' ? '#111' : '#f8f8f8', // Or your themed background
    },
  };

  const getTabIconColor = (colorScheme) => {
    return colorScheme === 'dark' ? '#FFF' : '#000'; // Change icon color based on light/dark mode
  };

  return (
    <SafeAreaView
      style={[
        styles.safeAreaContainer,
        { backgroundColor: colorScheme === 'dark' ? '#111' : '#f8f8f8' },
      ]}
    >
      <Tabs screenOptions={screenOptions}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                iconName="bicycle-outline"
                color={getTabIconColor(colorScheme)}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="PostRideScreen"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                iconName="add-circle-outline"
                color={getTabIconColor(colorScheme)}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="ProfileScreen"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                iconName="person-circle-outline"
                color={getTabIconColor(colorScheme)}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="MessagesScreen"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                iconName="chatbubble-ellipses-outline"
                color={getTabIconColor(colorScheme)}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="FriendsScreen"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                iconName="people-circle-outline"
                color={getTabIconColor(colorScheme)}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
