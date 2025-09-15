import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Checkbox } from "expo-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import colombiaData from "../../assets/data/colombia.json";
import { Picker } from "@react-native-picker/picker";
import Button from "../ui/Button";
import { ArrowLeft } from "lucide-react-native";

export default function ReportDetailsScreen() {
  const router = useRouter();

  const [direccion, setDireccion] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [accepted, setAccepted] = useState(false);

  const departamentos = colombiaData.departamentos.map((d) => d.nombre);
  const municipios =
    colombiaData.departamentos.find((d) => d.nombre === departamento)
      ?.municipios || [];
  const localidades =
    municipios.find((m) => m.nombre === municipio)?.localidades || [];

  const handleSubmit = () => {
    if (!direccion || !departamento || !municipio || !localidad || !accepted) {
      return;
    }
    router.push("/report-succes");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nuevo Reporte</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Título */}
        <Text style={styles.sectionTitle}>Datos del sitio</Text>

        {/* Dirección */}
        <Text style={styles.label}>
          Dirección o Descripción del sitio <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          value={direccion}
          onChangeText={setDireccion}
          placeholder="Escribe la dirección"
          style={styles.input}
        />

        {/* Departamento */}
        <Text style={styles.label}>
          Departamento <Text style={{ color: "red" }}>*</Text>
        </Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={departamento}
            onValueChange={setDepartamento}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione un departamento" value="" />
            {departamentos.map((dep) => (
              <Picker.Item key={dep} label={dep} value={dep} />
            ))}
          </Picker>
        </View>

        {/* Municipio */}
        <Text style={styles.label}>
          Municipio <Text style={{ color: "red" }}>*</Text>
        </Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={municipio}
            onValueChange={setMunicipio}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione un municipio" value="" />
            {municipios.map((mun) => (
              <Picker.Item key={mun.nombre} label={mun.nombre} value={mun.nombre} />
            ))}
          </Picker>
        </View>

        {/* Localidad */}
        <Text style={styles.label}>
          Localidad <Text style={{ color: "red" }}>*</Text>
        </Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={localidad}
            onValueChange={setLocalidad}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione una localidad" value="" />
            {localidades.map((loc) => (
              <Picker.Item key={loc} label={loc} value={loc} />
            ))}
          </Picker>
        </View>

        {/* Términos */}
        <View style={styles.termsRow}>
          <Checkbox
            value={accepted}
            onValueChange={setAccepted}
            color={accepted ? "#16a34a" : undefined}
          />
          <Text style={styles.termsText}>
            Acepto los <Text style={styles.link}>Condiciones del servicio</Text>,{" "}
            <Text style={styles.link}>Términos y condiciones</Text> y{" "}
            <Text style={styles.link}>Política de Privacidad</Text>
          </Text>
        </View>

        {/* Botón */}
        <Button
          title="Enviar Reporte"
          onPress={handleSubmit}
          disabled={!accepted}
        />
      </ScrollView>
    </SafeAreaView>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#111827",
  },
  input: {
    height: 50,
    borderWidth: 1.5,
    borderColor: "#16a34a", 
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 18,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  }, 
  pickerWrapper: {
    borderWidth: 1.5,
    borderColor: "#16a34a",
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  picker: {
    padding:0,
    margin:0,
    height: 50,
    fontSize: 18,
    color: "#111827",
  },
  label: {
    fontSize: 18,
    fontWeight: "400",
    marginTop: 12,
    marginBottom: 6,
    color: "#374151",
    
  },
  label_selecter: {
    fontSize: 18,
    fontWeight: "400",
    marginTop: 12,
    marginBottom: 6,
    color: "#374151",
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    color: "#374151",
    marginLeft: 8,
    lineHeight: 16,
  },
  link: { color: "#16a34a", textDecorationLine: "underline" },
});
