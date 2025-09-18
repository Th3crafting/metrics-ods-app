import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ActivityIndicator
} from "react-native";
import {
  ArrowLeft,
  Droplets,
  Trash2,
  TreePine,
  Volume2,
  AlertTriangle,
  AlertCircle,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config/env";

type ReportCard = {
  id: number;
  titulo: string;
  descripcion: string;
  direccion: string;
  fecha: string;
  tipoReporteId: number;
  tipoReporteNombre: string;
};

type DashboardData = {
  totals: { total: number; thisMonth: number };
  lists: {
    Abierto: ReportCard[];
    Pendiente: ReportCard[];
    EnRevision: ReportCard[];
    Cerrado: ReportCard[];
    Rechazado: ReportCard[];
  };
};

type StatusLabel = "Abierto" | "Pendiente" | "En Revisión" | "Cerrado" | "Rechazado";
type ReportWithStatus = ReportCard & { __status: StatusLabel };

const iconByTipoId: Record<number, React.ComponentType<{ size?: number; color?: string }>> = {
  2: Trash2,
  3: Droplets,
  4: TreePine,
  5: Volume2,
  6: AlertTriangle,
};

const iconByTipoName: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  basura: Trash2,
  fugas: Droplets,
  tala: TreePine,
  ruido: Volume2,
  otros: AlertTriangle,
};

function getIconForReport(r: { tipoReporteId?: number; tipoReporteNombre?: string }) {
  if (typeof r.tipoReporteId === "number" && iconByTipoId[r.tipoReporteId]) {
    return iconByTipoId[r.tipoReporteId];
  }
  if (r.tipoReporteNombre) {
    const k = r.tipoReporteNombre.trim().toLowerCase();
    if (iconByTipoName[k]) return iconByTipoName[k];
  }
  return AlertCircle;
}

const tag = <T extends ReportCard>(arr: T[], label: StatusLabel): (T & { __status: StatusLabel })[] =>
  arr.map(r => ({ ...r, __status: label }));

const { width } = Dimensions.get("window");

export default function MyReportsScreen() {
  const router = useRouter();

  const filters = ["Todos", "Pendientes", "En Revisión", "Cerrados", "Rechazados"] as const;
  type Filter = (typeof filters)[number];
  type NonAllFilter = Exclude<Filter, "Todos">;

  const filterToKey: Record<NonAllFilter, keyof DashboardData["lists"]> = {
    "Pendientes": "Pendiente",
    "En Revisión": "EnRevision",
    "Cerrados":   "Cerrado",
    "Rechazados": "Rechazado",
  };

  const filterToLabel: Record<NonAllFilter, StatusLabel> = {
    "Pendientes": "Pendiente",
    "En Revisión": "En Revisión",
    "Cerrados":   "Cerrado",
    "Rechazados": "Rechazado",
  };

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("Todos");
  
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = await AsyncStorage.getItem("auth_token");
        if (!token) return;
        
        const response = await fetch(`${API_BASE_URL}/dashboard?limit=20&offset=0`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const json: DashboardData = await response.json();
        setData(json);
      } catch (e: any) {
        setError(e?.message ?? "Error cargando reportes");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const allReports: ReportWithStatus[] = data
    ? [
      ...tag(data.lists.Abierto, "Abierto"),
      ...tag(data.lists.Pendiente, "Pendiente"),
      ...tag(data.lists.EnRevision, "En Revisión"),
      ...tag(data.lists.Cerrado, "Cerrado"),
      ...tag(data.lists.Rechazado, "Rechazado"),
    ]
    : [];

  let filteredReports: ReportWithStatus[] = [];
  if (data) {
    if (filter === "Todos") {
      filteredReports = allReports;
    } else {
      const key = filterToKey[filter];
      const label = filterToLabel[filter];
      filteredReports = tag(data.lists[key], label);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 10 }}>Cargando ...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={{ padding: 20 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={{ marginTop: 16, color: "#dc2626" }}>{error}</Text>
        </View>
      </SafeAreaView>
    )
  }
  
  const getStatusStyle = (status: ReportWithStatus["__status"]) => {
    switch (status) {
      case "Pendiente": return { color: "#ca8a04", bg: "#fef9c3" };
      case "Cerrado": return { color: "#16a34a", bg: "#dcfce7" };
      case "Rechazado": return { color: "#dc2626", bg: "#fee2e2" };
      case "En Revisión": return { color: "#2563eb", bg: "#dbeafe" };
      case "Abierto": return { color: "#6b7280", bg: "#e5e7eb" };
      default: return { color: "#6b7280", bg: "#e5e7eb" };
    }
  };
  
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}> Historial de Reportes</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Stats */}
          <View style={{ borderRadius: 15, overflow: "hidden", marginBottom: 18 }}>
            <LinearGradient
              colors={["#21BD48", "#069865"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ padding: 20 }}
            >
              <Text style={styles.statsNumber}>{data?.totals.total ?? 0}</Text>
              <Text style={styles.statsText}>Reportes totales</Text>
              <Text style={styles.statsNew}>Este mes {data?.totals.thisMonth ?? 0} nuevos</Text>
            </LinearGradient>
          </View>

          {/* Filters */}
          <View style={styles.filters}>
            {filters.map((f) => (
              <TouchableOpacity
                key={f}
                style={[styles.filterBtn, filter === f && styles.filterActive]}
                onPress={() => setFilter(f)}
              >
                <Text style={[styles.filterText, filter === f && { color: "#fff" }]}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* List */}
          {filteredReports.map((r) => {
            const s = getStatusStyle(r.__status);
            const Icon = getIconForReport(r);
            return (
              <View key={r.id} style={styles.reportCard}>
                <View style={styles.reportHeader}>
                  <Icon size={20} color="#3b82f6" />
                  <Text style={styles.reportType}>{r.titulo}</Text>
                  <View style={[styles.statusBox, { backgroundColor: s.bg }]}>
                    <Text style={{ color: s.color, fontSize: 12 }}>{r.__status}</Text>
                  </View>
                </View>
                <Text style={styles.reportDesc}>{r.descripcion}</Text>
                <Text style={styles.reportDate}>{new Date(r.fecha).toLocaleDateString()}</Text>
              </View>
            );
          })}

          {filteredReports.length === 0 && (
            <View style={{ marginTop: 16 }}>
              <Text style={{ textAlign: "center", color: "#6b7280" }}>
                No hay reportes para este filtro.
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    flexGrow: 1,
    padding: 18,
    paddingBottom: 30,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
    color: "#111",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  statsNumber: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  statsText: {
    color: "#fff",
    marginTop: 4,
  },
  statsNew: {
    color: "#bbf7d0",
    marginTop: 2,
    fontSize: 12,
  },
  filters: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 18,
  },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
  },
  filterActive: {
    backgroundColor: "#21BD48",
  },
  filterText: {
    fontSize: 14,
    color: "#374151",
  },
  reportCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  reportHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  reportType: {
    fontWeight: "600",
    marginLeft: 6,
  },
  reportDesc: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 4,
  },
  reportDate: {
    fontSize: 12,
    color: "#6b7280",
  },
  statusBox: {
  marginLeft: "auto",
  paddingHorizontal: 8,
  paddingVertical: 2,
  borderRadius: 8,
  },
});