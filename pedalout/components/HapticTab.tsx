import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Platform, Pressable } from 'react-native';
import React, { useState } from 'react';
import * as Haptics from 'expo-haptics';

export function HapticTab(props: BottomTabBarButtonProps) {
  const [pressed, setPressed] = useState(false);

  const handlePressIn = (ev) => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setPressed(true);
    props.onPressIn?.(ev);
  };

  const handlePressOut = (ev) => {
    setPressed(false);
    props.onPressOut?.(ev);
  };

  return (
    <Pressable
      onPress={props.onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed: isPressed }) => [
        styles.wrapper,
        props.style,
        {
          backgroundColor: 'transparent',
          opacity: 1,
        },
      ]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <View style={styles.iconContainer}>
        {pressed && <View style={styles.hapticCircle} />}
        {props.children}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  hapticCircle: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 248, 248, 0)',
    zIndex: 1,
    pointerEvents: 'none',
  },
});
