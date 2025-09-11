import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { ArrowLeft, Check } from "lucide-react-native";
import Button from "./ui/Button";

export default function ReportSuccessScreen() {
  const router = useRouter();

  return (
   <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1}}
      >

        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nuevo Reporte</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >

      {/* Card */}
      <View style={styles.card}>
        <Check size={64} color="#16a34a" />
        <Text style={styles.title}>¡Reporte Enviado!</Text>
        <Text style={styles.message}>
          Tu reporte ha sido enviado exitosamente y será revisado por nuestro equipo de moderadores.
        </Text>
        <Text style={styles.message}>
          Recibirás una notificación cuando el estado de tu reporte cambie.
        </Text>
      </View>

      {/* Botón */}
      <TouchableOpacity
      >
        <Button title="Volver al Inicio" onPress={() => router.push("/welcome")}></Button>
      </TouchableOpacity>
        </ScrollView>
         </KeyboardAvoidingView>
       </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffffe2",
  },
  scroll: {
    flexGrow: 1,
    padding: 18,
    paddingBottom: 60, // espacio extra abajo
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 50,
  },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
     shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  title: { fontSize: 20, fontWeight: "700", color: "#111827", marginVertical: 12 },
  message: { fontSize: 14, textAlign: "center", color: "#374151", marginBottom: 8 },
  backBtn: {
    backgroundColor: "#16a34a",
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: "center",
  },
  backBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
