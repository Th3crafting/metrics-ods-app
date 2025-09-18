import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions
} from "react-native";
import Button from "../ui/Button";
import { API_BASE_URL } from "../config/env";

const { width } = Dimensions.get("window");  

const validateEmail = (email: string) => /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);
const validatePassword = (password: string) => password.trim().length > 0;

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert("Error", "Por favor, ingresa un correo electrónico válido.");
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert("Error", "Ingresa tu contraseña.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err?.message || (res.status === 401 ? "Credenciales inválidas" : "No se pudo iniciar sesión");
        throw new Error(msg);
      }

      const data = await res.json();
      await AsyncStorage.setItem("auth_token", data.token);

      router.replace("/welcome");
    } catch (e: any) {
      Alert.alert("Error", e.message ?? "Error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >

          
          <Text style={styles.title}>Iniciar Sesión en NodoVerde</Text>

          <TextInput
            style={styles.input}
            placeholder="CORREO"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="CONTRASEÑA"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button title={loading ? "INGRESANDO..." : "INICIAR SESIÓN"} onPress={handleLogin} />

          <TouchableOpacity>
            <Text style={styles.forgot}>¿Olvidó su contraseña?{"\n"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonOutline}
            onPress={() => router.push("/register")}
          >
            <Text style={styles.buttonOutlineText}>CREAR CUENTA NUEVA</Text>
          </TouchableOpacity>

          {/* Home indicator */}
         
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
    justifyContent: "center",
    padding: 28,
  },
  title: {
    fontSize: width * 0.06, // relativo al ancho del dispositivo
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
    color: "#111",
  },
  input: {
    borderWidth: 2,
    borderColor: "#21BD48",
    borderRadius: 8,
    padding: 10,
    marginBottom: 18,
    width: "100%",
  },
  forgot: {
    marginTop: 18,
    textAlign: "center",
    color: "#555",
    textDecorationLine: "underline",
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: "#22c55e",
    padding: 11,
    borderRadius: 8,
    marginTop: 18,
    alignItems: "center",
  },
  buttonOutlineText: {
    color: "#22c55e",
    fontWeight: "600",
  },
});
