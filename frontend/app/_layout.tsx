import Sidebar from "@/src/ui/Sidebar";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function RootLayout() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* Sidebar global */}
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onCreateReport={() => {
          setSidebarVisible(false);
          // navegar a create-report
        }}
      />

      {/* Stack navigation */}
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </View>
  );
}
