import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FileText } from "lucide-react-native";
import { router } from "expo-router";

type ModeratorDashboardProps = {
  onBack?: () => void;
  onViewCases?: () => void;
};

export default function ModeratorDashboard({
  onBack,
  onViewCases,
}: ModeratorDashboardProps) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NodoVerde</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Panel principal */}
      <View style={styles.card}>
        <FileText size={36} color="#16a34a" style={{ marginBottom: 8 }} />
        <Text style={styles.cardTitle}>Panel de Moderación</Text>
        <Text style={styles.cardSubtitle}>
          Gestiona y revisa los reportes de la comunidad
        </Text>

        <TouchableOpacity style={styles.mainBtn} onPress={() => router.push("/cases-list")}>{/**enviar por caso id */}
          <Text style={styles.mainBtnText}>Ver Casos</Text>
        </TouchableOpacity>
      </View>

      {/* Estadísticas */}
      <View style={styles.statsRow}>
        <View style={[styles.statBox, { borderColor: "#facc15" }]}>
          <Text style={[styles.statNumber, { color: "#facc15" }]}>12</Text>
          <Text style={styles.statLabel}>Pendiente</Text>
        </View>
        <View style={[styles.statBox, { borderColor: "#ef4444" }]}>
          <Text style={[styles.statNumber, { color: "#ef4444" }]}>3</Text>
          <Text style={styles.statLabel}>Rechazado</Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <View style={[styles.statBox, { borderColor: "#22c55e" }]}>
          <Text style={[styles.statNumber, { color: "#22c55e" }]}>25</Text>
          <Text style={styles.statLabel}>Solucionados</Text>
        </View>
        <View style={[styles.statBox, { borderColor: "#3b82f6" }]}>
          <Text style={[styles.statNumber, { color: "#3b82f6" }]}>8</Text>
          <Text style={styles.statLabel}>Sin Revisar</Text>
        </View>
      </View>

      {/* Nota */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          ✔ Los casos deben ser revisados, verificar si los hechos reportados
          son verídicos y enviar el caso a la entidad adecuada
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backBtn: {
    fontSize: 18,
    color: "#374151",
    marginRight: 12,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  card: {
    margin: 16,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 12,
  },
  mainBtn: {
    backgroundColor: "#16a34a",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  mainBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 12,
  },
  statBox: {
    flex: 1,
    marginHorizontal: 6,
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    marginTop: 4,
    fontSize: 13,
    color: "#374151",
  },
  infoBox: {
    margin: 16,
    padding: 12,
    backgroundColor: "#eff6ff",
    borderRadius: 8,
  },
  infoText: {
    fontSize: 12,
    color: "#374151",
    textAlign: "center",
  },
});
