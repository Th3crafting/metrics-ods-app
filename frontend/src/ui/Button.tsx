import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  disabled?: boolean;
  icon?:React.ReactNode;
}

export default function Button({ title, onPress, style, textStyle, disabled, icon }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
       {icon}
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#069865", // teal-600
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
     marginTop: 12,
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabled: {
    backgroundColor: "#06986571", // gray-400
  },
});
