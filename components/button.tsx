import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '@/src/constants/Colors';

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  disabled?: boolean;  // Optional disabled prop
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, handlePress, disabled }) => {
  return (
    <TouchableOpacity 
      disabled={disabled} 
      style={[styles.container, disabled && styles.disabledContainer]}  
      onPress={handlePress} 
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: 10,
  },
  disabledContainer: {
    backgroundColor: 'gray',  // Optional: Style for disabled state
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
