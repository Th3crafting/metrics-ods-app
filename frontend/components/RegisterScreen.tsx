import { Checkbox } from 'expo-checkbox';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "./ui/Button";



export default function RegisterScreen( ) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }
    if (!acceptTerms) {
      Alert.alert("Error", "Debes aceptar los términos y condiciones");
      return;
    }
    Alert.alert("Éxito", "Usuario registrado correctamente");
    router.replace("/");

    router.replace("/welcome");
  };

  return (
    <View style={styles.container}>
      {/* Status bar fake */}
      <View style={styles.statusBar}>
        <Text style={styles.time}>9:41</Text>
        <View style={styles.statusIcons}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, { backgroundColor: "#ccc" }]} />
          <View style={styles.battery}>
            <View style={styles.batteryLevel} />
          </View>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.title}>¡Únete a NodoVerde!</Text>
        <Text style={styles.subtitle}>Sé parte del cambio en tu comunidad.</Text>

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
        <TextInput
          style={styles.input}
          placeholder="CONFIRMAR CONTRASEÑA"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

      <Button title="REGISTRARSE" onPress={handleRegister}/>

       <TouchableOpacity onPress={() => router.replace("/")}>
        <Text style={styles.linkLogin}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>

        <View style={styles.terms}>
          <Checkbox value={acceptTerms} onValueChange={setAcceptTerms} color={acceptTerms ? "#22c55e" : undefined} />
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
      {/* Home indicator */}
      <View style={styles.homeIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  statusBar: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  time: { fontSize: 14, fontWeight: "500" },
  statusIcons: { flexDirection: "row", alignItems: "center", gap: 4 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: "#000" },
  battery: { marginLeft: 8, width: 24, height: 12, borderWidth: 1, borderRadius: 3, justifyContent: "center" },
  batteryLevel: { width: 16, height: 8, marginLeft: 2, backgroundColor: "#000", borderRadius: 2 },
  title: { fontSize: 20, fontWeight: "600", textAlign: "center", marginBottom: 4, color: "#111" },
  subtitle: { fontSize: 14, textAlign: "center", marginBottom: 24, color: "#555" },
  input: { borderWidth: 2, borderColor: "#21BD48", borderRadius: 8, padding: 12, marginBottom: 12 },
  buttonPrimary: { backgroundColor: "#069865", padding: 16, borderRadius: 8, marginTop: 16, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600" },
  terms: { flexDirection: "row", alignItems: "flex-start", marginTop: 16, gap: 8 },
  termsText: { flex: 1, fontSize: 12, color: "#444" },
  link: { color: "#069865", textDecorationLine: "underline" },
  linkLogin: { color: "#069865", textDecorationLine: "underline",alignSelf: "center", marginTop: 16},
  homeIndicator: { alignSelf: "center", width: 120, height: 4, borderRadius: 2, backgroundColor: "#000", marginTop: 24 },
});
