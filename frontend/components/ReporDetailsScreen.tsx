import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from "react-native";

export default function ReportDetailsScreen() {
  const router = useRouter();
  const [direccion, setDireccion] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = () => {
    if (!direccion || !departamento || !municipio || !localidad || !accepted) {
      return;
    }
    router.push("/report-succes");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }} contentContainerStyle={{ padding: 16 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ fontSize: 16 }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nuevo Reporte</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.sectionTitle}>Datos del sitio</Text>

      {/* Dirección */}
      <Text style={styles.label}>Dirección o Descripción del sitio *</Text>
      <TextInput
        value={direccion}
        onChangeText={setDireccion}
        placeholder="Escribe la dirección"
        style={styles.input}
      />

      {/* Departamento */}
      <Text style={styles.label}>Departamento *</Text>
      <TextInput
        value={departamento}
        onChangeText={setDepartamento}
        placeholder="Selecciona departamento"
        style={styles.input}
      />

      {/* Municipio */}
      <Text style={styles.label}>Municipio *</Text>
      <TextInput
        value={municipio}
        onChangeText={setMunicipio}
        placeholder="Selecciona municipio"
        style={styles.input}
      />

      {/* Localidad */}
      <Text style={styles.label}>Localidad *</Text>
      <TextInput
        value={localidad}
        onChangeText={setLocalidad}
        placeholder="Selecciona localidad"
        style={styles.input}
      />

      {/* Términos */}
      <View style={styles.termsRow}>
        <Switch value={accepted} onValueChange={setAccepted} />
        <Text style={styles.termsText}>
          Acepto los{" "}
          <Text style={styles.link}>Condiciones del servicio</Text>,{" "}
          <Text style={styles.link}>Términos y condiciones</Text> y{" "}
          <Text style={styles.link}>Política de Privacidad</Text>
        </Text>
      </View>

      {/* Botón */}
      <TouchableOpacity
        style={[styles.submitBtn, { opacity: accepted ? 1 : 0.6 }]}
        onPress={handleSubmit}
        disabled={!accepted}
      >
        <Text style={styles.submitText}>Enviar Reporte</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  sectionTitle: { fontSize: 16, fontWeight: "500", marginBottom: 12 },
  label: { fontSize: 14, fontWeight: "500", marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
  termsRow: { flexDirection: "row", alignItems: "center", marginTop: 16 },
  termsText: { flex: 1, fontSize: 12, color: "#374151", marginLeft: 8 },
  link: { color: "#0ea5e9", textDecorationLine: "underline" },
  submitBtn: {
    marginTop: 24,
    backgroundColor: "#16a34a",
    padding: 16,
    borderRadius: 999,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
