import { Checkbox } from 'expo-checkbox';
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Button from "../ui/Button";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Validators } from '../utils/validators';


const { width } = Dimensions.get("window"); 
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;

export default function RegisterScreen() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [localidadId, setLocalidadId] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const [localidades, setLocalidades] = useState<{id: number; nombre: string}[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/localidades`);
        const data = await res.json();
        setLocalidades(data);
      } catch {
        Alert.alert("Error", "No fue posible cargar las localidaes.");
      }
    })();
  }, []);

  const handleRegister = async () => {
    if (!nombre.trim() || !email.trim() || !password.trim() || !direccion.trim()) {
      Alert.alert("Error", "Completa todos los campos.");
      return;
    }
    if (!localidadId) {
      Alert.alert("Error", "Selecciona una localidad.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }
    if (!Validators.email(email)) {
      Alert.alert("Error", "Por favor, ingresa un correo electrónico válido.");
      return;
    }
    if (!Validators.password(password)) {
      Alert.alert(
        "Error",
        "La contraseña debe tener al menos 8 caracteres, con mayúsculas, minúsculas, número y un carácter especial."
      );
      return;
    }
    if (!acceptTerms) {
      Alert.alert("Error", "Debes aceptar los términos y condiciones.");
      return;
    }
    
    setLoading(true);

    try {
      const payload = {
        name: nombre.trim(),
        email: email.trim(),
        password,
        direccion: direccion.trim(),
        localidadId,
      };

      const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg =
          res.status === 409
            ? "Ese correo ya está registrado."
            : err?.message || "No se pudo registrar el usuario.";
        throw new Error(msg);
      }

      Alert.alert("Éxito", "Usuario registrado correctamente");
      router.replace("/");
    } catch (e: any) {
      Alert.alert("Error", e.message ?? "Error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={styles.title}>¡Únete a NodoVerde!</Text>
            <Text style={styles.subtitle}>Sé parte del cambio en tu comunidad.</Text>

            <TextInput style={styles.input} placeholder="NOMBRE" value={nombre} onChangeText={setNombre} />

            <TextInput
              style={styles.input}
              placeholder="CORREO"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="DIRECCIÓN"
              value={direccion}
              onChangeText={setDireccion}
            />

            {/* Desplegable de localidades */}
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={localidadId ?? undefined}
                onValueChange={(v) => setLocalidadId(Number(v))}
              >
                <Picker.Item label="Selecciona tu localidad" value={undefined} />
                {localidades.map((loc) => (
                  <Picker.Item key={loc.id} label={`${loc.id} - ${loc.nombre}`} value={loc.id} />
                ))}
              </Picker>
            </View>

            <TextInput
              style={styles.input}
              placeholder="CONTRASEÑA"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="CONFIRMAR CONTRASEÑA"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <Button title={loading ? "REGISTRANDO..." : "REGISTRARSE"} onPress={handleRegister} disabled={loading} />

            <TouchableOpacity onPress={() => router.replace("/")}>
              <Text style={styles.linkLogin}>¿Ya tienes cuenta? Inicia sesión</Text>
            </TouchableOpacity>

            <View style={styles.terms}>
              <Checkbox
                value={acceptTerms}
                onValueChange={setAcceptTerms}
                color={acceptTerms ? "#22c55e" : undefined}
              />
              <Text style={styles.termsText}>
                Acepto los <Text style={styles.link}>Condiciones del servicio</Text>, los{" "}
                <Text style={styles.link}>Términos y condiciones generales</Text> y la{" "}
                <Text style={styles.link}>Política de privacidad</Text>.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  scroll: { flexGrow: 1, justifyContent: "center", padding: 28 },
  title: { fontSize: width * 0.06, fontWeight: "600", textAlign: "center", marginBottom: 4, color: "#111" },
  subtitle: { fontSize: 14, textAlign: "center", marginBottom: 24, color: "#555" },
  input: {
    borderWidth: 2,
    borderColor: "#21BD48",
    borderRadius: 8,
    padding: 10,
    marginBottom: 18,
    width: "100%",
  },
  pickerWrapper: {
    borderWidth: 2,
    borderColor: "#21BD48",
    borderRadius: 8,
    marginBottom: 18,
    overflow: "hidden",
  },
  terms: { flexDirection: "row", alignItems: "flex-start", marginTop: 16, gap: 8 },
  termsText: { flex: 1, fontSize: 12, color: "#444" },
  link: { color: "#069865", textDecorationLine: "underline" },
  linkLogin: { color: "#069865", textDecorationLine: "underline", alignSelf: "center", marginTop: 16 },
});