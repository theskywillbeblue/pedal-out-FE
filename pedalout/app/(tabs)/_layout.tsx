import { Tabs } from "expo-router";
import React from "react";
import { View, Platform, SafeAreaView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HapticTab } from "@/components/HapticTab";
import { useColorScheme } from "@/hooks/useColorScheme";

const TabIcon = ({ iconName, color }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        transform: [{ translateY: -4 }], // shift icon up a bit
      }}
    >
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
      height: Platform.OS === "android" ? 60 : 80,
      paddingTop: 0,
      paddingBottom: Platform.OS === "android" ? 20 : 30,
      position: "relative",
      borderTopWidth: 0,
      backgroundColor: "transparent",
      paddingHorizontal: 10,
    },
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
