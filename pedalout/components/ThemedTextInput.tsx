import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export function ThemedTextInput(props: TextInputProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const placeholderColor = useThemeColor({}, 'text');

  return (
    <TextInput
      placeholderTextColor={placeholderColor + '99'} // subtle tint
      {...props}
      style={[
        styles.input,
        { backgroundColor, color: textColor },
        props.style, // allow override
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
  },
});
