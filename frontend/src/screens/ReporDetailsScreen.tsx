import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Checkbox } from "expo-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import Button from "../ui/Button";
import { ArrowLeft } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config/env";

async function getToken(): Promise<string | null> {
  return await AsyncStorage.getItem("auth_token");
}

type Localidad = { id: number; nombre: string; sectorId?: number; sectorNombre?: string };

export default function ReportDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    tipoReporteId?: string;
    tipoNombre?: string;
    nivelIncidenciaId?: string;
    descripcion?: string;
    imageUri?: string;
  }>();

  const [direccion, setDireccion] = useState("");
  const [localidadId, setLocalidadId] = useState<number | "">("");
  const [sectorId, setSectorId] = useState<number | null>(null);
  const [sectorNombre, setSectorNombre] = useState<string>("");
  const [localidades, setLocalidades] = useState<Localidad[]>([]);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        const headers: Record<string, string> = {};
        if (token) headers.Authorization = `Bearer ${token}`;
        
        const r = await fetch(`${API_BASE_URL}/localidades`, { headers });
        const locs: Localidad[] = r.ok ? await r.json() : [];
        setLocalidades(locs);
      } catch {
        setLocalidades([]);
      }
    })();
  }, []);

  const onChangeLocalidad = async (value: number | "") => {
    setLocalidadId(value);
    if(!value) {
      setSectorId(null);
      setSectorNombre("");
      return;
    }

    const loc = localidades.find(l => l.id === value);
    if (loc?.sectorId) {
      setSectorId(loc.sectorId);
      if (loc.sectorNombre) setSectorNombre( loc.sectorNombre);
      else {
        try {
          const token = await getToken();
          const headers: Record<string, string> = {};
          if (token) headers.Authorization = `Bearer ${token}`;
          const rs = await fetch(`${API_BASE_URL}/sectores/${loc.sectorId}`, { headers });
          if (rs.ok) {
            const s = await rs.json();
            setSectorNombre(s?.nombre ?? "");
          } else setSectorNombre("");
        } catch { setSectorNombre(""); }
      }
    } else {
      setSectorId(null);
      setSectorNombre("");
    }
  };

  const titulo = useMemo(() => {
    const tipo = params.tipoNombre || "Reporte";
    const frag = (direccion || params.descripcion || "").trim();
    const raw = frag ? `${tipo} - ${frag}` : tipo;
    return raw.length > 100 ? raw.slice(0, 100) : raw;
  }, [params.tipoNombre, params.descripcion, direccion]);

  const handleSubmit = async () => {
    if (!direccion || !sectorId || !accepted) {
      Alert.alert("Faltan datos", "Completa la dirección, selecciona un sector y acepta los términos.");
      return;
    }

    try {
      const token = await getToken();
      const headers: any = {
        "Content-Type": "application/json",
      };
      if (token) headers.Authorization = `Bearer ${token}`;

      const body = {
        titulo,
        descripcion: params.descripcion || null,
        direccion,
        tipoReporteId: Number(params.tipoReporteId),
        sectorId: sectorId,
        nivelIncidenciaId: Number(params.nivelIncidenciaId),
      };

      const resp = await fetch(`${API_BASE_URL}/reportes`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || "Error creando el reporte");
      }

      router.push("/report-succes");
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "No fue posible enviar el reporte");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nuevo Reporte</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Título (preview) */}
        <Text style={styles.sectionTitle}>Datos del sitio</Text>

        {/* Dirección */}
        <Text style={styles.label}>
          Dirección o descripción del sitio <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          value={direccion}
          onChangeText={setDireccion}
          placeholder="Escribe la dirección"
          style={styles.input}
        />

        {/* Localidad UI existente */}
        <Text style={styles.label}>Localidad</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={localidadId}
            onValueChange={onChangeLocalidad}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione una localidad" value="" />
            {localidades.map((l) => (
              <Picker.Item key={l.id} label={l.nombre} value={l.id} />
            ))}
          </Picker>
        </View>

        {/* Sector (auto, no editable) */}
        <Text style={styles.label}>
          Sector <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          value={sectorNombre || (sectorId ? `#${sectorId}` : "")}
          editable={false}
          placeholder="Se autocompleta al elegir la localidad"
          style={[styles.input, { backgroundColor: "#f3f4f6" }]}
        />

        {/* Términos */}
        <View style={styles.termsRow}>
          <Checkbox value={accepted} onValueChange={setAccepted} color={accepted ? "#16a34a" : undefined} />
          <Text style={styles.termsText}>
            Acepto los <Text style={styles.link}>Condiciones del servicio</Text>,{" "}
            <Text style={styles.link}>Términos y condiciones</Text> y{" "}
            <Text style={styles.link}>Política de Privacidad</Text>
          </Text>
        </View>

        {/* Enviar */}
        <Button title="Enviar Reporte" onPress={handleSubmit} disabled={!accepted} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12, color: "#111827" },
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
  picker: { padding: 0, margin: 0, height: 50, fontSize: 18, color: "#111827" },
  label: { fontSize: 18, fontWeight: "400", marginTop: 12, marginBottom: 6, color: "#374151" },
  termsRow: { flexDirection: "row", alignItems: "flex-start", marginTop: 20 },
  termsText: { flex: 1, fontSize: 12, color: "#374151", marginLeft: 8, lineHeight: 16 },
  link: { color: "#16a34a", textDecorationLine: "underline" },
});