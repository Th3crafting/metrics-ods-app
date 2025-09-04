import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

type Entity = {
  id: string;
  name: string;
  category: string;
  color: string;
};

const ENTITIES: Entity[] = [
  { id: "1", name: "Secretaría de Ambiente", category: "Ambiental", color: "#22c55e" },
  { id: "2", name: "Empresa de Acueducto", category: "Servicios Públicos", color: "#3b82f6" },
  { id: "3", name: "Policía Ambiental", category: "Seguridad", color: "#a855f7" },
  { id: "4", name: "Alcaldía Local", category: "Gobierno", color: "#f59e0b" },
  { id: "5", name: "Cuerpo de Bomberos", category: "Emergencias", color: "#ef4444" },
  { id: "6", name: "Defensa Civil", category: "Emergencias", color: "#ef4444" },
];

type AssignEntityProps = {
  onBack?: () => void;
  onConfirm?: (entityId: string) => void;
};

export default function AssignEntityScreen({
  onBack,
  onConfirm,
}: AssignEntityProps) {
  const [selectedEntity, setSelectedEntity] = useState<string>("");

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Asignar Entidad</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Case info */}
      <View style={styles.caseInfo}>
        <Text style={styles.caseId}>ID: RPT-2025-001</Text>
        <Text style={[styles.caseType, { color: "#ef4444" }]}>• Basura</Text>
        <Text style={[styles.caseStatus, { color: "#f59e0b" }]}>
          Estado: Pendiente
        </Text>
      </View>

      {/* Instructions */}
      <View style={[styles.card, { backgroundColor: "#eff6ff" }]}>
        <Text style={[styles.cardTitle, { color: "#1d4ed8" }]}>
          Instrucciones
        </Text>
        <Text style={styles.cardText}>
          Selecciona la entidad más apropiada para manejar este caso según el tipo de problema
          reportado. Una vez asignado el caso quedará en estado “Pendiente” hasta ser resuelto.
        </Text>
      </View>

      {/* Lista de entidades */}
      <Text style={styles.sectionTitle}>Seleccionar Entidad Responsable</Text>
      {ENTITIES.map((entity) => (
        <TouchableOpacity
          key={entity.id}
          style={[
            styles.entityCard,
            selectedEntity === entity.id && {
              borderColor: entity.color,
              backgroundColor: "#f0fdf4",
            },
          ]}
          onPress={() => setSelectedEntity(entity.id)}
        >
          <Text style={styles.entityName}>{entity.name}</Text>
          <Text style={[styles.entityCategory, { color: entity.color }]}>
            {entity.category}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Confirm button */}
      <TouchableOpacity
        style={[
          styles.confirmBtn,
          !selectedEntity && { opacity: 0.5 },
        ]}
        disabled={!selectedEntity}
        onPress={() => selectedEntity && onConfirm?.(selectedEntity)}
      >
        <Text style={styles.confirmBtnText}>Enviar Caso a Entidad</Text>
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
  caseInfo: { padding: 16 },
  caseId: { fontSize: 14, fontWeight: "600" },
  caseType: { fontSize: 14, fontWeight: "500", marginTop: 2 },
  caseStatus: { fontSize: 13, fontWeight: "600", marginTop: 2 },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  cardTitle: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
  cardText: { fontSize: 13, color: "#374151", lineHeight: 18 },
  sectionTitle: {
    marginHorizontal: 16,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  entityCard: {
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
  },
  entityName: { fontSize: 14, fontWeight: "600", color: "#111827" },
  entityCategory: { fontSize: 12, marginTop: 4, fontWeight: "500" },
  confirmBtn: {
    backgroundColor: "#16a34a",
    margin: 16,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmBtnText: { color: "#fff", fontWeight: "600", fontSize: 14 },
});
