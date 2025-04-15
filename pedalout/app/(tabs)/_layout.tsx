import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";

const TabIcon = ({ iconName, color }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", width: 60 }}>
      <Ionicons name={iconName} size={30} color={color} />
    </View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const screenOptions = {
    headerShown: false,
    tabBarActiveTintColor: "#FFF",
    tabBarButton: HapticTab,
    tabBarStyle: {
      height: 60, // Reduced height
      paddingTop: 5, // Adjust padding top
      paddingBottom: 5, // Adjust padding bottom to ensure the icons fit
      position: 'relative',
      borderTopWidth: 0,
      backgroundColor: 'transparent',
    },
  };

  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <TabIcon iconName="bicycle-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="PostRide"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <TabIcon iconName="add-circle-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <TabIcon iconName="person-circle-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Messages"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <TabIcon iconName="chatbubble-ellipses-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Friends"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <TabIcon iconName="people-circle-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
