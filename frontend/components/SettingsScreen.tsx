import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { ArrowLeft, Camera } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [localidad, setLocalidad] = useState("");

  return (
     <SafeAreaView style={styles.safe}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1}}
          >
    
            <ScrollView
              contentContainerStyle={styles.scroll}
              keyboardShouldPersistTaps="handled"
            >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Configuración</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Foto de perfil */}
        <TouchableOpacity style={styles.avatarBox}>
          <View style={styles.avatarCircle}>
            <Camera size={28} color="#16a34a" />
          </View>
          <Text style={styles.avatarText}>Toca para cambiar tu foto</Text>
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configuración</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Foto de perfil */}
      <TouchableOpacity style={styles.avatarBox}>
        <View style={styles.avatarCircle}>
          <Camera size={28} color="#16a34a" />
        </View>
        <Text style={styles.avatarText}>Toca para cambiar tu foto</Text>
      </TouchableOpacity>

      {/* Campos */}
      <TextInput
        placeholder="Nombre y Apellido"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Correo Electrónico"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Dirección de residencia"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        placeholder="Localidad de residencia"
        style={styles.input}
        value={localidad}
        onChangeText={setLocalidad}
      />

        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText} onPress={() => router.push("/")}>
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
  
</ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
      {/* Botón Guardar */}
      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveText}>Guardar Cambios</Text>
      </TouchableOpacity>

      {/* Cerrar sesión */}
      <TouchableOpacity style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    safe: {
    flex: 1,
    backgroundColor: "#ffffffe2",
  },
  scroll: {
    flexGrow: 1,
    padding: 28,
    paddingBottom: 60, // espacio extra abajo
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
  },
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  avatarBox: { alignItems: "center", marginBottom: 20 },
  avatarCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: "#e5e7eb", alignItems: "center", justifyContent: "center",
  },
  avatarText: { marginTop: 8, fontSize: 12, color: "#6b7280" },
  input: { 
    borderWidth: 1, 
 borderColor: "#21BD48", 
    borderRadius: 8, 
    padding: 12, 
    marginBottom: 12 
  },
  saveBtn: {
    backgroundColor: "#16a34a", 
    padding: 16, 
    borderRadius: 999, 
    alignItems: "center", 
    marginTop: 8,
  },
  saveText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  logoutBtn: { alignItems: "center", marginTop: 16 },
  logoutText: { color: "#dc2626", fontWeight: "500" },
});
