import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
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
    <PlatformPressable
    {...props}
    android_ripple={null} // 👈 Disables Android default ripple
    onPressIn={handlePressIn}
    onPressOut={handlePressOut}
    style={({ pressed: _pressed }) => [
      styles.wrapper,
      props.style,
    ]}
  >
      <View style={styles.iconContainer}>
        {pressed && <View style={styles.hapticCircle} />}
        {props.children}
      </View>
    </PlatformPressable>
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
    backgroundColor: 'rgba(255,255,255,0.2)',
    zIndex: 0,
  },
});
