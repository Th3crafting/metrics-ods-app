import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import {
  ArrowLeft,
  Camera,
  Check,
  Droplets,
  Trash2,
  TreePine,
  Volume2,
} from "lucide-react-native";
import React, { useState } from "react";
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
} from "react-native";
import Button from "./ui/Button";
import Slider from "@react-native-community/slider";

const { width } = Dimensions.get("window");

export default function CreateReportScreen() {
  const router = useRouter();

  const [selectedType, setSelectedType] = useState<string>("");
  const [description, setDescription] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState(1);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const reportTypes = [
    { id: "basura", label: "Basura", icon: Trash2, color: "#ea580c" },
    { id: "fugas", label: "Fugas", icon: Droplets, color: "#2563eb" },
    { id: "tala", label: "Tala", icon: TreePine, color: "#15803d" },
    { id: "ruido", label: "Ruido", icon: Volume2, color: "#7c3aed" },
  ];

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
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    if (!selectedType || !description) {
      Alert.alert("Campos incompletos", "Selecciona tipo y agrega descripción.");
      return;
    }
    router.push("/report-details");
  };

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
       
          <View style={styles.grid}>
            {reportTypes.map((type) => {
              const IconComponent = type.icon;
              const isSelected = selectedType === type.id;
              return (
                <TouchableOpacity
                  key={type.id}
                  style={[styles.typeCard, isSelected && styles.typeCardSelected]}
                  onPress={() => setSelectedType(type.id)}
                >
                  {isSelected && (
                    <View style={styles.checkCircle}>
                      <Check size={14} color="#fff" />
                    </View>
                  )}
                  <IconComponent
                    size={32}
                    color={isSelected ? type.color : "#4b5563"}
                  />
                  <Text
                    style={[
                      styles.typeLabel,
                      { color: isSelected ? "#0f766e" : "#374151" },
                    ]}
                  >
                    {type.label}
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

          {/* Imagen */}
          <View style={styles.section}>
            <Text style={styles.label}>Imagen</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Camera size={18} color="#4b5563" />
              <Text style={styles.uploadText}>Seleccionar Archivo</Text>
            </TouchableOpacity>
            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={styles.previewImage}
                resizeMode="cover"
              />
            )}
          </View>

          {/* Urgencia */}
          <View style={styles.section}>
            <Text style={styles.label}>Nivel de Urgencia</Text>
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>Bajo</Text>
              <Text style={styles.sliderLabel}>Medio</Text>
              <Text style={styles.sliderLabel}>Alto</Text>
            </View>
            <Slider
              style={{ width: "100%" }}
              minimumValue={1}
              maximumValue={3}
              step={1}
              value={urgencyLevel}
              onValueChange={setUrgencyLevel}
              minimumTrackTintColor="#14b8a6"
              maximumTrackTintColor="#d1d5db"
              thumbTintColor="#14b8a6"
            />
            <View style={styles.sliderDots}>
              <View
                style={[
                  styles.dot,
                  { backgroundColor: urgencyLevel >= 1 ? "#22c55e" : "#d1d5db" },
                ]}
              />
              <View
                style={[
                  styles.dot,
                  { backgroundColor: urgencyLevel >= 2 ? "#eab308" : "#d1d5db" },
                ]}
              />
              <View
                style={[
                  styles.dot,
                  { backgroundColor: urgencyLevel >= 3 ? "#ef4444" : "#d1d5db" },
                ]}
              />
            </View>
          </View>

          {/* Info */}
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              No puedes realizar más de 3 reportes al mes, su reporte será
              validado por moderadores
            </Text>
          </View>

          {/* Botón */}
          <Button title="Continuar" onPress={handleContinue} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f5f5c3",
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  typeCard: {
    width: width / 2 - 24, // 2 columnas con margen
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginBottom: 12,
    position: "relative",
  },
  typeCardSelected: {
    borderColor: "#21BD48",
    backgroundColor: "#f0fdfa",
  },
  checkCircle: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#21BD48",
    borderRadius: 999,
    padding: 4,
  },
  typeLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  section: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
  },
  uploadText: { marginLeft: 8, fontSize: 14, color: "#374151" },
  previewImage: {
    marginTop: 10,
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  sliderLabels: { 
    flexDirection: "row", 
    justifyContent: "space-between"
   },
  sliderLabel: { 
    fontSize: 12, 
    color: "#6b7280" 
  },
  sliderDots: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    paddingHorizontal: 4,
  },
  dot: { width: 12, height: 12, borderRadius: 6 },
  infoBox: {
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  infoText: { fontSize: 12, color: "#6b7280", textAlign: "center" },
});
