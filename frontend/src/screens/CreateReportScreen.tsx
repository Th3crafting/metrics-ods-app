import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Slider from "@react-native-community/slider";
import Button from "../ui/Button";
import {
  ArrowLeft,
  Camera,
  Check,
  Droplets,
  Trash2,
  TreePine,
  Volume2,
  AlertTriangle,
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config/env";

const { width } = Dimensions.get("window");

async function getToken(): Promise<string | null> {
  return await AsyncStorage.getItem("auth_token");
}

type TipoReporte = { id: number; nombre: string; descripcion?: string | null };
type NivelIncidencia = { id: number; nivel: number; descripcion: string | null };

export default function CreateReportScreen() {
  const router = useRouter();

  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [tipos, setTipos] = useState<TipoReporte[]>([]);
  const [niveles, setNiveles] = useState<NivelIncidencia[]>([]);
  const [nivelIndex, setNivelIndex] = useState(0);

  const iconMap: Record<string, any> = {
    basura: Trash2,
    fugas: Droplets,
    tala: TreePine,
    ruido: Volume2,
    otros: AlertTriangle,
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "Se necesita acceso a la galería.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        const headers: Record<string, string> = {};
        if (token) headers.Authorization = `Bearer ${token}`;

        const [rTipos, rNiveles] = await Promise.all([
          fetch(`${API_BASE_URL}/tipos-reportes`, { headers }),
          fetch(`${API_BASE_URL}/niveles`, { headers }),
        ]);

        const tiposData: TipoReporte[] = rTipos.ok
          ? await rTipos.json()
          : [
              { id: 2, nombre: "Basura" },
              { id: 3, nombre: "Fugas" },
              { id: 4, nombre: "Tala" },
              { id: 5, nombre: "Ruido" },
              { id: 6, nombre: "Otros" },
            ];

        const nivelesData: NivelIncidencia[] = rNiveles.ok
          ? await rNiveles.json()
          : [
              { id: 1, nivel: 1, descripcion: "Bajo" },
              { id: 2, nivel: 2, descripcion: "Medio" },
              { id: 3, nivel: 3, descripcion: "Alto" },
            ];

        nivelesData.sort((a, b) => a.nivel - b.nivel);

        setTipos(tiposData);
        setNiveles(nivelesData);
        setNivelIndex(0);
      } catch (e: any) {
        Alert.alert("Aviso", e?.message || "No se pudieron cargar catálogos. Se usarán valores por defecto.");
        setTipos([
          { id: 2, nombre: "Basura" },
          { id: 3, nombre: "Fugas" },
          { id: 4, nombre: "Tala" },
          { id: 5, nombre: "Ruido" },
          { id: 6, nombre: "Otros" },
        ]);
        setNiveles([
          { id: 1, nivel: 1, descripcion: "Bajo" },
          { id: 2, nivel: 2, descripcion: "Medio" },
          { id: 3, nivel: 3, descripcion: "Alto" },
        ]);
        setNivelIndex(0);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const selectedNivelId = useMemo(
    () => (niveles[nivelIndex] ? niveles[nivelIndex].id : undefined),
    [niveles, nivelIndex]
  );
  const selectedTipoNombre = useMemo(
    () =>
      tipos.find((t) => t.id === selectedTypeId)?.nombre ??
      (selectedTypeId ? String(selectedTypeId) : ""),
    [tipos, selectedTypeId]
  );

  const handleContinue = () => {
    if (!selectedTypeId || !description.trim() || selectedNivelId === undefined) {
      Alert.alert("Campos incompletos", "Selecciona un tipo, el nivel y agrega una descripción.");
      return;
    }

    router.push({
      pathname: "/report-details",
      params: {
        tipoReporteId: String(selectedTypeId),
        tipoNombre: selectedTipoNombre,
        nivelIncidenciaId: String(selectedNivelId),
        descripcion: description,
        imageUri: imageUri ?? "",
      },
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator />
          <Text style={{ marginTop: 8 }}>Cargando…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nuevo Reporte</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Grid de tipos (3 columnas, se adapta bien a 5/6/etc.) */}
          <View style={styles.grid3}>
            {tipos.map((type) => {
              const isSelected = selectedTypeId === type.id;
              const key = type.nombre.trim().toLowerCase();
              const IconComponent = iconMap[key] || AlertTriangle;

              return (
                <TouchableOpacity
                  key={type.id}
                  style={[styles.typeCard3, isSelected && styles.typeCardSelected]}
                  onPress={() => setSelectedTypeId(type.id)}
                  activeOpacity={0.9}
                >
                  {isSelected && (
                    <View style={styles.checkCircle}>
                      <Check size={14} color="#fff" />
                    </View>
                  )}
                  <IconComponent size={28} color={isSelected ? "#0ea5e9" : "#4b5563"} />
                  <Text style={[styles.typeLabel, { color: isSelected ? "#0f766e" : "#374151" }]}>
                    {type.nombre}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Descripción */}
          <View style={styles.section}>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Describe el problema"
              multiline
              style={styles.textarea}
            />
          </View>

          {/* Imagen (opcional) */}
          <View style={styles.section}>
            <Text style={styles.label}>Imagen</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Camera size={18} color="#4b5563" />
              <Text style={styles.uploadText}>Seleccionar Archivo</Text>
            </TouchableOpacity>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="cover" />}
          </View>

          {/* Nivel de incidencia desde BD */}
          <View style={styles.section}>
            <Text style={styles.label}>Nivel de Incidencia</Text>
            <View style={styles.sliderLabels}>
              {niveles.map((n) => (
                <Text key={n.id} style={styles.sliderLabel}>
                  {n.descripcion ?? `Nivel ${n.nivel}`}
                </Text>
              ))}
            </View>
            <Slider
              style={{ width: "100%" }}
              minimumValue={0}
              maximumValue={Math.max(0, niveles.length - 1)}
              step={1}
              value={nivelIndex}
              onValueChange={setNivelIndex}
              minimumTrackTintColor="#14b8a6"
              maximumTrackTintColor="#d1d5db"
              thumbTintColor="#14b8a6"
            />
            <View style={styles.sliderDots}>
              {niveles.map((n, i) => (
                <View
                  key={n.id}
                  style={[
                    styles.dot,
                    { backgroundColor: nivelIndex >= i ? "#22c55e" : "#d1d5db" },
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Info */}
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              No puedes realizar más de 3 reportes al mes, su reporte será validado por moderadores.
            </Text>
          </View>

          {/* Continuar */}
          <Button title="Continuar" onPress={handleContinue} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const CARD_W_3 = width / 3 - 20;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffffe2" },
  scroll: { flexGrow: 1, padding: 18, paddingBottom: 60 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 50 },
  headerTitle: { fontSize: 18, fontWeight: "600" },

  grid3: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  typeCard3: {
    width: CARD_W_3,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    marginBottom: 12,
    position: "relative",
    backgroundColor: "#fff",
  },
  typeCardSelected: { borderColor: "#21BD48", backgroundColor: "#f0fdfa" },
  checkCircle: { position: "absolute", top: -8, right: -8, backgroundColor: "#21BD48", borderRadius: 999, padding: 4 },
  typeLabel: { marginTop: 8, fontSize: 12, fontWeight: "500", textAlign: "center" },

  section: { marginTop: 20 },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 8 },
  textarea: { borderWidth: 1, borderColor: "#d1d5db", borderRadius: 8, padding: 12, minHeight: 100, textAlignVertical: "top" },
  uploadButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#f3f4f6", borderWidth: 1, borderColor: "#d1d5db", borderRadius: 8, padding: 12 },
  uploadText: { marginLeft: 8, fontSize: 14, color: "#374151" },
  previewImage: { marginTop: 10, width: "100%", height: 200, borderRadius: 8 },

  sliderLabels: { flexDirection: "row", justifyContent: "space-between" },
  sliderLabel: { fontSize: 12, color: "#6b7280" },
  sliderDots: { flexDirection: "row", justifyContent: "space-between", marginTop: 6, paddingHorizontal: 4 },
  dot: { width: 12, height: 12, borderRadius: 6 },

  infoBox: { backgroundColor: "#f9fafb", padding: 12, borderRadius: 8, marginTop: 16 },
  infoText: { fontSize: 12, color: "#6b7280", textAlign: "center" },
});