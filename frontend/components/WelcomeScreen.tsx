// screens/WelcomeScreen.tsx
import { router } from "expo-router";
import { Menu } from "lucide-react-native";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "./ui/Button";
import Sidebar from "./ui/Sidebar";




export default function WelcomeScreen() {
  const [open, setOpen] = React.useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Menu size={28} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NodoVerde</Text>
        <View style={{ width: 28 }} /> {/* espacio para balancear el header */}
      </View>

      {/* Sidebar encima de todo */}
        <Sidebar
          visible={open}
          onClose={() => setOpen(false)}
           onCreateReport={() =>setOpen(false)}
          onMyReports={() => setOpen(false)}
          onHowTo={() => setOpen(false)}
          onSettings={() => setOpen(false)}
        />

      {/* Contenido Scroll */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Card Bienvenida */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>¡Bienvenido a NodoVerde!</Text>
          <Text style={styles.cardSubtitle}>
            Conectando vecinos para un barrio más sostenible
          </Text>

          <Button title="+ Crear Nuevo Reporte"  onPress={() => router.push("/report")}/>
        </View>

        {/* Card Reporta */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Reporta lo que importa</Text>
          <Text style={styles.cardSubtitle}>
            ¿Has visto basura acumulada, fugas de agua o ruidos molestos? 
            Con NodoVerde puedes reportar problemas ambientales en minutos. 
            Tu voz cuenta para que las autoridades y vecinos actúen rápidamente
          </Text>

          <Image
            source={require("../assets/images/welcome1.png")} // 👈 agrega tu imagen aquí
            style={styles.image}
            resizeMode="cover"
            
           
          />
          {/* espacio para balancear el header */}
          <Text style={styles.cardSubtitle} >
            
            ¿Has visto basura acumulada, fugas de agua o ruidos molestos? 
            Con NodoVerde puedes reportar problemas ambientales en minutos. 
            Tu voz cuenta para que las autoridades y vecinos actúen rápidamente
          </Text>

          <Image
            source={require("../assets/images/welcome1.png")} // 👈 agrega tu imagen aquí
            style={styles.image}
            resizeMode="cover"
          />
              
        
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111",
  },
  cardSubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#21BD48", // verde
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    marginTop: 12,
  },
});
