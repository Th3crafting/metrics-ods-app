import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

type CaseDetailProps = {
  onBack?: () => void;
  caseData: {
    id: string;
    type: string;
    urgency: "Baja" | "Media" | "Alta";
    description: string;
    location: string;
    reporter: string;
    date: string;
  };
  onAssign?: () => void;
  onReject?: () => void;
};

export default function CaseDetailScreen({
  onBack,
  caseData,
  onAssign,
  onReject,
}: CaseDetailProps) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Revisar Caso</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* ID y Estado */}
      <View style={styles.infoBox}>
        <Text style={styles.caseId}>ID: RPT-{caseData.id}</Text>
        <Text style={[styles.caseType, { color: "#ef4444" }]}>
          • {caseData.type}
        </Text>
        <Text
          style={[
            styles.urgency,
            caseData.urgency === "Alta" && { color: "#ef4444" },
            caseData.urgency === "Media" && { color: "#facc15" },
            caseData.urgency === "Baja" && { color: "#22c55e" },
          ]}
        >
          Urgencia: {caseData.urgency}
        </Text>
      </View>

      {/* Descripción */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Descripción del Problema</Text>
        <Text style={styles.cardText}>{caseData.description}</Text>
      </View>

      {/* Ubicación */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Ubicación</Text>
        <Text style={styles.cardText}>{caseData.location}</Text>
      </View>

      {/* Reportado por */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Reportado por</Text>
        <Text style={styles.cardText}>
          {caseData.reporter} - {caseData.date}
        </Text>
      </View>

      {/* Instrucciones */}
      <View style={[styles.card, { backgroundColor: "#eff6ff" }]}>
        <Text style={[styles.cardTitle, { color: "#1d4ed8" }]}>
          Instrucciones para Moderadores
        </Text>
        <Text style={styles.cardText}>
          • Verificar que la información sea veraz y completa{"\n"}
          • Evaluar si constituye una infracción ambiental{"\n"}
          • Marcar como &quot;Pendiente&quot; para asignar a una entidad responsable{"\n"}
          • Marcar como &quot;Rechazado&quot; si no cumple criterios{"\n"}
          • Marcar como &quot;Solucionado&quot; si se resolvió
        </Text>
      </View>

      {/* Botones */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.assignBtn} onPress={() => router.push("/assing-entity")}>
          <Text style={styles.assignBtnText}>Asignar a Entidad (Pendiente)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectBtn} onPress={onReject}>
          <Text style={styles.rejectBtnText}>Rechazar Caso</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backBtn: { fontSize: 18, color: "#374151", marginRight: 12 },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 16, fontWeight: "600" },
  infoBox: { padding: 16 },
  caseId: { fontSize: 14, fontWeight: "600", marginBottom: 4 },
  caseType: { fontSize: 14, fontWeight: "500" },
  urgency: { marginTop: 4, fontSize: 13, fontWeight: "600" },
  card: {
    backgroundColor: "#fff",
    margin: 12,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cardTitle: { fontSize: 14, fontWeight: "600", marginBottom: 4 },
  cardText: { fontSize: 13, color: "#374151", lineHeight: 18 },
  actions: { margin: 16 },
  assignBtn: {
    backgroundColor: "#facc15",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  assignBtnText: { color: "#111827", fontWeight: "600", textAlign: "center" },
  rejectBtn: { backgroundColor: "#ef4444", padding: 14, borderRadius: 8 },
  rejectBtnText: { color: "#fff", fontWeight: "600", textAlign: "center" },
});
