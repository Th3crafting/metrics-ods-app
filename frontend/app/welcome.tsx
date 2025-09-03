import WelcomeScreen from "@/components/WelcomeScreen";
import React from "react";
import { View } from "react-native";

export default function Welcome() {
  const handleNavigateToMain = () => {
    // Aquí puedes decidir hacia dónde va después del Welcome
    // Ejemplo: router.replace("/home") cuando tengas tu HomeScreen
    console.log("Navegar al main app");
  };

  return (
    <View style={{ flex: 1 }}>
      <WelcomeScreen onNavigateToMain={handleNavigateToMain} />
    </View>
  );
}
