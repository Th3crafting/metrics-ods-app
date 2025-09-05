import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ArrowLeft, Trash2, Droplets } from "lucide-react-native";
import { useRouter } from "expo-router";

type Report = {
  id: string;
  type: "basura" | "fuga";
  description: string;
  status: "Rechazado" | "Pendiente" | "Realizado";
  date: string;
};

const reports: Report[] = [
  { id: "1", type: "basura", description: "Basura acumulada cerca al restaurante", status: "Rechazado", date: "19 ene" },
  { id: "2", type: "fuga", description: "Fuga de agua urgente en el Barrio...", status: "Pendiente", date: "19 ene" },
  { id: "3", type: "basura", description: "Basura con mal olor en la esquina", status: "Realizado", date: "19 ene" },
];

export default function MyReportsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<"Todos" | "Pendientes" | "Realizados">("Todos");

  const filterToStatus: Record<"Pendientes" | "Realizados", "Pendiente" | "Realizado"> = {
    Pendientes: "Pendiente",
    Realizados: "Realizado",
  };

  const filteredReports =
    filter === "Todos"
      ? reports
      : reports.filter((r) => r.status === filterToStatus[filter as "Pendientes" | "Realizados"]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pendiente": return { color: "#ca8a04", bg: "#fef9c3" };
      case "Realizado": return { color: "#16a34a", bg: "#dcfce7" };
      case "Rechazado": return { color: "#dc2626", bg: "#fee2e2" };
      default: return { color: "#6b7280", bg: "#e5e7eb" };
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi Historial</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Stats */}
      <View style={styles.statsCard}>
        <Text style={styles.statsNumber}>5</Text>
        <Text style={styles.statsText}>Reportes totales</Text>
        <Text style={styles.statsNew}>Este mes 3 nuevos</Text>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        {["Todos", "Pendientes", "Realizados"].map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterActive]}
            onPress={() => setFilter(f as any)}
          >
            <Text style={[styles.filterText, filter === f && { color: "#fff" }]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <ScrollView style={{ marginTop: 12 }}>
        {filteredReports.map((r) => {
          const status = getStatusStyle(r.status);
          return (
            <View key={r.id} style={styles.reportCard}>
              <View style={styles.reportHeader}>
                {r.type === "basura" ? (
                  <Trash2 size={20} color="#dc2626" />
                ) : (
                  <Droplets size={20} color="#3b82f6" />
                )}
                <Text style={styles.reportType}>{r.type === "basura" ? "Basura" : "Fuga"}</Text>
                <View style={[styles.statusBox, { backgroundColor: status.bg }]}>
                  <Text style={{ color: status.color, fontSize: 12 }}>{r.status}</Text>
                </View>
              </View>
              <Text style={styles.reportDesc}>{r.description}</Text>
              <Text style={styles.reportDate}>{r.date}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  statsCard: { backgroundColor: "#16a34a", borderRadius: 8, padding: 16, marginBottom: 16 },
  statsNumber: { color: "#fff", fontSize: 20, fontWeight: "700" },
  statsText: { color: "#fff", marginTop: 4 },
  statsNew: { color: "#bbf7d0", marginTop: 2, fontSize: 12 },
  filters: { flexDirection: "row", justifyContent: "space-around", marginBottom: 8 },
  filterBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, backgroundColor: "#f3f4f6" },
  filterActive: { backgroundColor: "#16a34a" },
  filterText: { fontSize: 14, color: "#374151" },
  reportCard: { backgroundColor: "#fff", borderRadius: 8, padding: 12, marginBottom: 12, elevation: 2 },
  reportHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 },
  reportType: { fontWeight: "600", marginLeft: 6 },
  statusBox: { marginLeft: "auto", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  reportDesc: { fontSize: 14, color: "#374151", marginBottom: 4 },
  reportDate: { fontSize: 12, color: "#6b7280" },
});
