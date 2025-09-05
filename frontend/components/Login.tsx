import { useRouter } from "expo-router";
import { Shield } from "lucide-react-native"; // similar a lucide-react en web
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "./ui/Button";
import GradientButton from "./ui/GradientButton";


export default function LoginScreen(){
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }
    Alert.alert("Bienvenido", `Has iniciado sesión con ${email}`);
    router.push("/welcome") // 👈 redirige al welcome
    
  };

  return (
    <View style={styles.container}>
      {/* Status bar fake */}
      <View style={styles.statusBar}>
        <Text style={styles.time}>9:41</Text>
        <View style={styles.statusIcons}>
          <View style={styles.dots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={[styles.dot, { backgroundColor: "#ccc" }]} />
          </View>
          <View style={styles.battery}>
            <View style={styles.batteryLevel} />
          </View>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
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
          <Text style={styles.forgot}>¿Olvidó su contraseña?</Text>
        </TouchableOpacity>

       <GradientButton title="ACCESO MODERADOR" onPress={() => router.push("/moderator-dashboard")} icon={<Shield size={18} color="#fff"></Shield>}/>

        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.buttonOutlineText}>CREAR CUENTA NUEVA</Text>
        </TouchableOpacity>
      </View>

      {/* Home indicator */}
      <View style={styles.homeIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  statusBar: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  time: { fontSize: 14, fontWeight: "500" },
  statusIcons: { flexDirection: "row", alignItems: "center" },
  dots: { flexDirection: "row", gap: 2 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: "#000" },
  battery: { marginLeft: 8, width: 24, height: 12, borderWidth: 1, borderRadius: 3, justifyContent: "center" },
  batteryLevel: { width: 16, height: 8, marginLeft: 2, backgroundColor: "#000", borderRadius: 2 },
  title: { fontSize: 20, fontWeight: "600", textAlign: "center", marginBottom: 24, color: "#111" },
  input: { borderWidth: 2, borderColor: "#14b8a6", borderRadius: 8, padding: 12, marginBottom: 12 },
  buttonPrimary: { backgroundColor: "#0d9488", padding: 16, borderRadius: 8, marginTop: 16, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600" },
  forgot: { marginTop: 12, textAlign: "center", color: "#555", textDecorationLine: "underline" },
  buttonModerator: { flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#10b981", padding: 16, borderRadius: 8, marginTop: 16, gap: 8 },
  buttonOutline: { borderWidth: 2, borderColor: "#22c55e", padding: 16, borderRadius: 8, marginTop: 16, alignItems: "center" },
  buttonOutlineText: { color: "#22c55e", fontWeight: "600" },
  homeIndicator: { alignSelf: "center", width: 120, height: 4, borderRadius: 2, backgroundColor: "#000", marginTop: 24 },
});


