import { useRouter } from "expo-router";
import { Shield } from "lucide-react-native";
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
import Button from "./ui/Button";
import GradientButton from "./ui/GradientButton";

const { width } = Dimensions.get("window");  

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  return emailRegex.test(email);
}
const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return passwordRegex.test(password);
};

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    
    
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert(
        'Error',
        'La contraseña debe tener al menos 6 caracteres, incluyendo una letra y un número.'
      );
      return;
    }
    Alert.alert("Bienvenido", `Has iniciado sesión con ${email}`);
    router.push("/welcome");
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

          <Button title="INICIAR SESIÓN" onPress={handleLogin} />

          <TouchableOpacity>
            <Text style={styles.forgot}>¿Olvidó su contraseña?{"\n"}</Text>
          </TouchableOpacity>

          <GradientButton
            title="ACCESO MODERADOR"
            onPress={() => router.push("/moderator-dashboard")}
            icon={<Shield size={18} color="#fff" />}
          />

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
