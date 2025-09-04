import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";

type Case = {
  id: string;
  type: string;
  status: "Pendiente" | "Rechazado" | "Solucionado" | "Sin Revisar";
  urgency: "Baja" | "Media" | "Alta";
  title: string;
  location: string;
  reporter: string;
  date: string;
};

const MOCK_CASES: Case[] = [
  {
    id: "1",
    type: "Ruido",
    status: "Sin Revisar",
    urgency: "Baja",
    title: "Ruido excesivo por construcción nocturna",
    location: "Barrio Residencial",
    reporter: "Ana Martínez",
    date: "2023-01-12",
  },
  {
    id: "2",
    type: "Basura",
    status: "Pendiente",
    urgency: "Alta",
    title: "Basura acumulada en la esquina",
    location: "Restaurante El Buen Sabor",
    reporter: "Luis Pérez",
    date: "2023-01-15",
  },
];

type CasesListProps = {
  onBack?: () => void;
  onSelectCase: (caseId: string) => void;
};

export default function CasesListScreen({
  onBack,
  onSelectCase,
}: CasesListProps) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lista de Casos</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Filtros */}
      <View style={styles.filters}>
        <Text style={[styles.filter, { backgroundColor: "#dbeafe", color: "#1d4ed8" }]}>
          Sin Revisar
        </Text>
        <Text style={[styles.filter, { backgroundColor: "#d1fae5", color: "#059669" }]}>
          Todos
        </Text>
        <Text style={[styles.filter, { backgroundColor: "#fef9c3", color: "#ca8a04" }]}>
          Pendientes
        </Text>
      </View>

      {/* Lista */}{/**=> onSelectCase(item.id) */}
      <FlatList
        data={MOCK_CASES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/cases-details") } 
          >
            <View style={styles.cardHeader}>
              <Text style={styles.caseType}>{item.type}</Text>
              <Text
                style={[
                  styles.caseStatus,
                  item.status === "Sin Revisar" && { color: "#3b82f6" },
                  item.status === "Pendiente" && { color: "#facc15" },
                  item.status === "Rechazado" && { color: "#ef4444" },
                  item.status === "Solucionado" && { color: "#22c55e" },
                ]}
              >
                {item.status}
              </Text>
            </View>
            <Text style={styles.caseTitle}>{item.title}</Text>
            <Text style={styles.caseDetail}>Ubicación: {item.location}</Text>
            <Text style={styles.caseDetail}>Reportado por: {item.reporter}</Text>
            <Text style={styles.caseDetail}>Fecha: {item.date}</Text>
            <Text style={[styles.urgency, item.urgency === "Alta" && { color: "#ef4444" }]}>
              Urgencia: {item.urgency}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Ver más */}
      <TouchableOpacity style={styles.loadMore}>
        <Text style={{ color: "#16a34a", fontWeight: "600" }}>Ver más</Text>
      </TouchableOpacity>
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
  filters: { flexDirection: "row", justifyContent: "center", margin: 16 },
  filter: {
    fontSize: 12,
    fontWeight: "500",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  caseType: { fontWeight: "600", color: "#111827" },
  caseStatus: { fontSize: 12, fontWeight: "600" },
  caseTitle: { marginTop: 4, fontWeight: "500", color: "#111827" },
  caseDetail: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  urgency: { fontSize: 12, marginTop: 6, fontWeight: "600", color: "#16a34a" },
  loadMore: { alignItems: "center", marginVertical: 16 },
});
