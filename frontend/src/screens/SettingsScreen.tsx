import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
  Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ArrowLeft, Camera, ChevronDown } from "lucide-react-native";
import { useRouter } from "expo-router";
import Button from "../ui/Button";
import { API_BASE_URL } from "../config/env";

type Localidad = { id: number; nombre: string };
type UserFull = {
  id: number;
  name: string;
  email: string;
  password?: string;
  direccion: string;
  localidadId: number | null;
};

export default function SettingsScreen() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showLocModal, setShowLocModal] = useState<boolean>(false);

  const [token, setToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserFull | null>(null);
  const [localidades, setLocalidades] = useState<Localidad[]>([]);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [direccion, setDireccion] = useState<string>("");
  const [localidadId, setLocalidadId] = useState<number | null>(null);

  const selectedLocalidadName = useMemo(() => {
    if (!currentUser) return "";
    const id = isEditing ? localidadId ?? currentUser.localidadId : currentUser.localidadId;
    const found = localidades.find((l) => l.id === id);
    return (found?.nombre || "") || (id ? `Localidad ${id}` : "");
  }, [currentUser, localidades, localidadId, isEditing]);

  useEffect(() => {
    (async () => {
      try {
        const tkn = await AsyncStorage.getItem("auth_token");
        setToken(tkn);

        await fetchLocalidades();

        const me = await fetchMe(tkn);
        if (!me?.id) throw new Error("No se encontró tu usuario");

        const full = await fetchUserById(me.id, tkn);
        setCurrentUser(full);
      } catch (e: any) {
        Alert.alert("Error", e?.message ?? "No se pudo cargar la información de tu cuenta.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const fetchMe = async (bearer: string | null) => {
    if (!bearer) return null;
    const res = await fetch(`${API_BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${bearer}` },
    });
    if (!res.ok) return null;
    return (await res.json()) as { id: number; name: string; email: string };
  };

  const fetchUserById = async (id: number, bearer: string | null) => {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: bearer ? { Authorization: `Bearer ${bearer}` } : {},
    });
    if (!res.ok) throw new Error("No se pudo obtener el usuario por id");
    const u = (await res.json()) as UserFull;
    return {
      id: u.id,
      name: u.name ?? "",
      email: u.email ?? "",
      direccion: u.direccion ?? "",
      localidadId: u.localidadId ?? null,
    };
  };

  const fetchLocalidades = async () => {
    const res = await fetch(`${API_BASE_URL}/localidades`);
    if (!res.ok) throw new Error("No se pudieron obtener las localidades");
    const list = (await res.json()) as Localidad[];
    setLocalidades(list || []);
  };

  const handleUpdatePress = async () => {
    if (!currentUser) return;

    if (!isEditing) {
      setIsEditing(true);
      setName(currentUser.name ?? "");
      setEmail(currentUser.email ?? "");
      setDireccion(currentUser.direccion ?? "");
      setLocalidadId(currentUser.localidadId ?? null);
      setPassword("");
      return;
    }

    const payload: Partial<UserFull & { password: string }> = {};
    if (name.trim() && name.trim() !== currentUser.name) payload.name = name.trim();
    if (email.trim() && email.trim() !== currentUser.email) payload.email = email.trim();
    if (direccion.trim() && direccion.trim() !== currentUser.direccion)
      payload.direccion = direccion.trim();
    if (typeof localidadId === "number" && localidadId !== (currentUser.localidadId ?? null))
      payload.localidadId = localidadId;
    if (password.trim()) payload.password = password.trim();

    if (Object.keys(payload).length === 0) {
      Alert.alert("Sin cambios", "No realizaste modificaciones.");
      setIsEditing(false);
      return;
    }

    try {
      setSaving(true);
      const res = await fetch(`${API_BASE_URL}/users/${currentUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await tryReadMessage(res);
        throw new Error(msg || "No se pudo actualizar tu información");
      }

      const refreshed = await fetchUserById(currentUser.id, token);
      setCurrentUser(refreshed);

      setIsEditing(false);
      setName("");
      setEmail("");
      setDireccion("");
      setLocalidadId(refreshed.localidadId ?? null);
      setPassword("");

      Alert.alert("Listo", "Tu información fue actualizada.");
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "No se pudo actualizar la información.");
    } finally {
      setSaving(false);
    }
  };

  const tryReadMessage = async (res: Response) => {
    try {
      const j = await res.json();
      return j?.message || j?.error || "";
    } catch {
      return "";
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("auth_token");
    } finally {
      router.push("/");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Configuración</Text>
            <View style={{ width: 24 }} />
          </View>

          {loading ? (
            <View style={styles.loaderBox}>
              <ActivityIndicator size="large" />
              <Text style={styles.loaderText}>Cargando tu información…</Text>
            </View>
          ) : (
            <>
              {/* Foto de perfil */}
              <TouchableOpacity style={styles.avatarBox} activeOpacity={0.7}>
                <View style={styles.avatarCircle}>
                  <Camera size={28} color="#16a34a" />
                </View>
                <Text style={styles.avatarText}>Toca para cambiar tu foto</Text>
              </TouchableOpacity>

              {/* Nombre */}
              <TextInput
                placeholder={currentUser?.name || "Nombre y Apellido"}
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={isEditing ? name : ""}
                onChangeText={setName}
                editable={isEditing}
              />

              {/* Email */}
              <TextInput
                placeholder={currentUser?.email || "Correo Electrónico"}
                style={[styles.input, !isEditing && styles.inputDisabled]}
                keyboardType="email-address"
                autoCapitalize="none"
                value={isEditing ? email : ""}
                onChangeText={setEmail}
                editable={isEditing}
              />

              {/* Password */}
              <TextInput
                placeholder={"••••••••"}
                style={[styles.input, !isEditing && styles.inputDisabled]}
                secureTextEntry
                value={isEditing ? password : ""}
                onChangeText={setPassword}
                editable={isEditing}
              />

              {/* Dirección */}
              <TextInput
                placeholder={currentUser?.direccion || "Dirección de residencia"}
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={isEditing ? direccion : ""}
                onChangeText={setDireccion}
                editable={isEditing}
              />

              {/* Localidad (selector) */}
              <TouchableOpacity
                activeOpacity={isEditing ? 0.7 : 1}
                style={[
                  styles.selectInput,
                  !isEditing && styles.inputDisabled,
                  isEditing && styles.selectActive,
                ]}
                onPress={() => (isEditing ? setShowLocModal(true) : null)}
              >
                <Text style={[styles.selectText, !selectedLocalidadName && styles.placeholderText]}>
                  {selectedLocalidadName || "Selecciona tu localidad"}
                </Text>
                <ChevronDown size={18} color="#6b7280" />
              </TouchableOpacity>

              {/* Botón principal */}
              <Button
                title={isEditing ? (saving ? "Guardando…" : "Guardar cambios") : "Actualizar información"}
                onPress={handleUpdatePress}
                disabled={saving}
              />

              {/* Botón Cerrar sesión – estilo pill sin cambiar color */}
              <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} disabled={saving}>
                <Text style={styles.logoutText}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal Localidades */}
      <Modal
        visible={showLocModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowLocModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Selecciona tu localidad</Text>
            <ScrollView style={{ maxHeight: 320 }}>
              {localidades.map((loc) => {
                const label = loc.nombre || `Localidad ${loc.id}`;
                const selected = (isEditing ? localidadId : currentUser?.localidadId) === loc.id;
                return (
                  <TouchableOpacity
                    key={loc.id}
                    style={[styles.locRow, selected && styles.locRowSelected]}
                    onPress={() => {
                      setLocalidadId(loc.id);
                      setShowLocModal(false);
                    }}
                  >
                    <Text style={[styles.locText, selected && styles.locTextSelected]}>{label}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity style={styles.modalClose} onPress={() => setShowLocModal(false)}>
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffffe2",
  },
  scroll: {
    flexGrow: 1,
    padding: 28,
    paddingBottom: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
  },
  headerTitle: { fontSize: 18, fontWeight: "600" },

  loaderBox: { alignItems: "center", paddingVertical: 32 },
  loaderText: { marginTop: 10, color: "#6b7280" },

  avatarBox: { alignItems: "center", marginBottom: 20 },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { marginTop: 8, fontSize: 12, color: "#6b7280" },

  input: {
    borderWidth: 1,
    borderColor: "#21BD48",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "white",
  },
  inputDisabled: {
    backgroundColor: "#f3f4f6",
  },

  selectInput: {
    borderWidth: 1,
    borderColor: "#21BD48",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectActive: {
    backgroundColor: "white",
  },
  selectText: {
    fontSize: 14,
    color: "#111827",
  },
  placeholderText: {
    color: "#9ca3af",
  },

  // Botón Cerrar sesión – estética pill, mismo color rojo
  logoutBtn: {
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#dc2626",
  },
  logoutText: { color: "#dc2626", fontWeight: "600", fontSize: 15 },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "white",
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  locRow: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb",
  },
  locRowSelected: {
    backgroundColor: "#ecfdf5",
  },
  locText: { fontSize: 14, color: "#111827" },
  locTextSelected: { fontWeight: "700", color: "#065f46" },
  modalClose: {
    alignSelf: "center",
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 999,
    backgroundColor: "#f3f4f6",
  },
  modalCloseText: { color: "#111827", fontWeight: "600" },
});