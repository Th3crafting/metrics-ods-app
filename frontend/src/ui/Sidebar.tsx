import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  BookOpen,
  FileText,
  PlusCircle,
  Settings,
  User,
  X,
} from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { API_BASE_URL } from "../config/env";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.8, 320);

export type SidebarProps = {
  visible: boolean;
  onClose: () => void;
  onCreateReport?: () => void;
  onMyReports?: () => void;
  onHowTo?: () => void;
  onSettings?: () => void;
};

type MenuItemProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
};

function MenuItem({ icon, title, subtitle, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIcon}>{icon}</View>
      <View style={styles.menuTextBox}>
        <Text style={styles.menuTitle}>{title}</Text>
        {!!subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );
}

export default function Sidebar({
  visible,
  onClose
}: SidebarProps): React.JSX.Element {
  // animaciones
  const slideX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [activos, setActivos] = useState<number>(0);
  const [resueltos, setResueltos] = useState<number>(0);

  useEffect(() => {
    const load = async () => {
      try {
        const token = await AsyncStorage.getItem("auth_token");
        if (!token) return;

        const hdrs = { Authorization: `Bearer ${token}` };
        const u = await fetch(`${API_BASE_URL}/users/me`, { headers: hdrs }).then(r => r.json());
        setName(u?.name ?? "");
        setEmail(u?.email ?? "");

        const s = await fetch(`${API_BASE_URL}/reportes/summary`, { headers: hdrs }).then(r => r.json());
        setActivos(Number(s?.activos ?? 0));
        setResueltos(Number(s?.resueltos ?? 0));
      } catch {
        return;
      }
    };

    if (visible) load();

    Animated.parallel([
      Animated.timing(slideX, {
        toValue: visible ? 0 : -DRAWER_WIDTH,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: visible ? 0.35 : 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, slideX, overlayOpacity]);



  return (
    <View
      style={styles.root}
      pointerEvents={visible ? "auto" : "none"}
    >
      {/*  clicable para cerrar */}
      <Animated.View
        style={[styles.overlay, { opacity: overlayOpacity }]}
      />
      <TouchableOpacity
        style={StyleSheet.absoluteFill}
        activeOpacity={1}
        onPress={onClose}
      />

  
      <Animated.View
        style={[
          styles.drawer,
          { transform: [{ translateX: slideX }] },
        ]}
      >
     <View style={{ borderRadius: 5, overflow: "hidden", marginBottom: 8 }}>
        <LinearGradient
          colors={["#21BD48", "#069865"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          {/* Botón cerrar arriba */}
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <X size={20} color="#fff" />
          </TouchableOpacity>

    {/* Avatar + datos usuario */}
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <User size={32} color="#16a34a" />
            </View>
            <Text style={styles.name}>{name || "Usuario"}</Text>
            <Text style={styles.email}>{email || "-"}</Text>
          </View>
        </LinearGradient>
      </View> 

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{activos}</Text>
            <Text style={styles.statLabel}>Reportes activos</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{resueltos}</Text>
            <Text style={styles.statLabel}>Casos resueltos</Text>
          </View>
        </View>

        {/* Menú */}
        <View style={styles.menu}>
        <MenuItem
          icon={<PlusCircle size={22} color="#16a34a" />}
          title="Crear Reporte"
          subtitle="Reporta un problema ambiental"
          onPress={() => {
            onClose();
            router.push("/report");
          }

          }
        />
          <MenuItem
            icon={<FileText size={22} color="#3b82f6" />}
            title="Mis Reportes"
            subtitle="Ver historial de reportes"
            onPress={() =>{
              onClose();
              router.push("/my-reports")
            }}
          />
          <MenuItem
            icon={<BookOpen size={22} color="#ec4899" />}
            title="Cómo Usar"
            subtitle="Guía de la aplicación"
            onPress={() =>{
              onClose();
              router.push("/welcome")
            }}
          />
          <MenuItem
            icon={<Settings size={22} color="#4b5563" />}
            title="Configuración"
            subtitle="Ajustes de la cuenta"
            onPress={() =>{
              onClose();
              router.push("/settings")
            }}
          />
        </View>

        {/* Footer */}
        <Text style={styles.footer}>📍 Bogotá, Colombia</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999, // encima de Welcome
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
  drawer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: "#fff",
    elevation: 10, // Android
    zIndex: 1000,  // iOS / RN
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  headerGradient: {
  padding: 20,
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
},

closeBtn: {
  position: "absolute",
  top: 16,
  right: 16,
  backgroundColor: "rgba(0,0,0,0.2)",
  padding: 6,
  borderRadius: 20,
},

userInfo: {
  marginTop: 10,
  alignItems: "center",
},

avatar: {
  width: 64,
  height: 64,
  borderRadius: 32,
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 8,
},

name: {
  fontSize: 16,
  fontWeight: "600",
  color: "#fff",
},

email: {
  fontSize: 13,
  color: "#e5e5e5",
},

  header: {
    backgroundColor: "#16a34a",
    alignItems: "center",
    paddingVertical: 24,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
  },
  statBox: { alignItems: "center" },
  statNumber: { fontWeight: "bold", color: "#16a34a", fontSize: 16 },
  statLabel: { fontSize: 12, color: "#6b7280" },
  menu: { paddingHorizontal: 16, marginTop: 8 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  menuIcon: { width: 26, alignItems: "center", marginRight: 10 },
  menuTextBox: { flexShrink: 1 },
  menuTitle: { fontSize: 14, fontWeight: "500" },
  menuSubtitle: { fontSize: 12, color: "#6b7280" },
  footer: { fontSize: 12, color: "#6b7280", padding: 16 },
});
