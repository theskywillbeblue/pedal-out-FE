import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HapticTab } from "@/components/HapticTab";
import { View, Text } from "react-native";
import { ThemedText } from '@/components/ThemedText';


import TabBarBackground from "@/components/ui/TabBarBackground";

import { useColorScheme } from "@/hooks/useColorScheme";

const tabIconStyle = { alignItems: "center", width: 70 };
const tabTextIconStyle = { fontSize: 12, marginTop: 2 };

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (



    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000",
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: "absolute" },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="ViewRides"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <View style={tabIconStyle}>
              <Ionicons name="bicycle-outline" size={24} color={color} />
              <ThemedText type="tabText">
          View Rides
        </ThemedText>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="PostRide"
        options={{
          tabBarLabel: () => null,
          title: "Post A Ride",
          tabBarIcon: ({ color }) => (
            <View style={tabIconStyle}>
              <Ionicons name="add-circle-outline" size={25} color={color} />
              <ThemedText type="tabText">
                Post A Ride
              </ThemedText>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: () => null,
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <View style={tabIconStyle}>
            <Ionicons name="person-circle-outline" size={28} color={color} />
            <ThemedText type="tabText">
                Profile
              </ThemedText>
              </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Messages"
        options={{
          tabBarLabel: () => null,
          title: "Messages",
          tabBarIcon: ({ color }) => (
            <View style={tabIconStyle}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={28}
              color={color}
            />
              <ThemedText type="tabText">
                Chat
              </ThemedText>
              </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Friends"
        options={{
          tabBarLabel: () => null,
          title: "Friends",
          tabBarIcon: ({ color }) => (
            <View style={tabIconStyle}>
            <Ionicons name="people-circle-outline" size={28} color={color} />
            <ThemedText type="tabText">
                Friends
              </ThemedText>
              </View>
          ),
        }}
      />
    </Tabs>
  );
}
