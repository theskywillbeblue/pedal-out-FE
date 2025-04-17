// hooks/useThemeColor.ts

import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

type Theme = 'light' | 'dark';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme: Theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors[theme][colorName];
}
