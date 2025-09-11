import { Checkbox } from 'expo-checkbox';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "./ui/Button";
import { SafeAreaView } from 'react-native-safe-area-context';


const { width } = Dimensions.get("window"); 


const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valida formato básico de correo
  return emailRegex.test(email);
}

const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return passwordRegex.test(password);
};


export default function RegisterScreen( ) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleRegister = () => {

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
    <SafeAreaView style={styles.safe}>

      <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" :
        undefined}
        style={{flex: 1}}
        >

        <ScrollView
                contentContainerStyle={styles.scroll}
                keyboardShouldPersistTaps="handled"
              >    
  

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
    fontSize: width * 0.06, 
    fontWeight: "600", 
    textAlign: "center",
     marginBottom: 4, 
     color: "#111" 
  },
  subtitle: {
    fontSize: 14, 
    textAlign: "center", 
    marginBottom: 24, 
    color: "#555" 
  },
  input: { 
    borderWidth: 2,
    borderColor: "#21BD48",
    borderRadius: 8,
    padding: 10,
    marginBottom: 18,
    width: "100%",
  },
  buttonPrimary: { backgroundColor: "#069865", padding: 16, borderRadius: 8, marginTop: 16, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600" },
  terms: { flexDirection: "row", alignItems: "flex-start", marginTop: 16, gap: 8 },
  termsText: { flex: 1, fontSize: 12, color: "#444" },
  link: { color: "#069865", textDecorationLine: "underline" },
  linkLogin: { color: "#069865", textDecorationLine: "underline",alignSelf: "center", marginTop: 16},
  homeIndicator: { alignSelf: "center", width: 120, height: 4, borderRadius: 2, backgroundColor: "#000", marginTop: 24 },
});
