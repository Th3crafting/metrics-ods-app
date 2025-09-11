// screens/WelcomeScreen.tsx
import { router } from "expo-router";
import { Menu } from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // 👈 IMPORTANTE
import Button from "./ui/Button";
import Sidebar from "./ui/Sidebar";
import { Video, ResizeMode  } from "expo-av";

Dimensions.get("window");

export default function WelcomeScreen() {
  const [open, setOpen] = React.useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >

          <View style={styles.header}>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Menu size={28} color="#111" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>NodoVerde</Text>
            <View style={{ width: 28 }} /> 
          </View>

         
          <Sidebar
            visible={open}
            onClose={() => setOpen(false)}
            onCreateReport={() => setOpen(false)}
            onMyReports={() => setOpen(false)}
            onHowTo={() => setOpen(false)}
            onSettings={() => setOpen(false)}
          />

          {/* Contenido */}
          <View style={styles.scrollContent}>
            {/* Card Bienvenida */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>¡Bienvenido a NodoVerde!</Text>
              <Text style={styles.cardSubtitle}>
                Conectando vecinos para un barrio más sostenible
              </Text>

              <Button
                title="+ Crear Nuevo Reporte"
                onPress={() => router.push("/report")}
              />
            </View>

            {/* Card Reporta */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Reporta lo que importa</Text>
              <Text style={styles.cardSubtitle}>
                ¿Has visto basura acumulada, fugas de agua o ruidos molestos?
                Con NodoVerde puedes reportar problemas ambientales en minutos.
                Tu voz cuenta para que las autoridades y vecinos actúen
                rápidamente

              </Text>

              <Image
                source={require("../assets/images/welcome1.png")}
                style={styles.image}
                resizeMode="cover"
              />
            </View>

             {/* Card Manual de Uso */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>📘 Manual de Uso de NodoVerde</Text>

                <Text style={styles.cardSubtitle}>
                  1. Inicio y navegación: Desde el menú superior izquierdo puedes crear reportes, consultar tus reportes, acceder a la guía de uso y ajustar configuraciones.
                </Text>

                <Text style={styles.cardSubtitle}>
                  2. Crear un reporte: Presiona el botón &quot;+ Crear Nuevo Reporte&quot;, completa los datos, adjunta fotos si es necesario y envíalo para notificar a vecinos y autoridades.
                </Text>
                <Video
                  source={require("../assets/video/Creaunreporte.mp4")} // 👈 tu archivo local
                  style={{ 
                    width: "100%", 
                    aspectRatio: 16/9, 
                    borderRadius: 8, 
                    marginTop: 12 
                  }}
                  useNativeControls
                  resizeMode={ResizeMode.COVER}   // 👈 en vez de "cover"
                  isLooping
                />
                
                <Text style={styles.cardSubtitle}>
                  3. Tipos de incidentes: Basura acumulada, fugas de agua, ruidos molestos u otras situaciones que afecten la sostenibilidad del barrio.
                </Text>

                <Text style={styles.cardSubtitle}>
                  4. Consulta y seguimiento: En &quot;Mis Reportes&quot; revisa el estado de cada reporte, comentarios de autoridades y tu historial de contribuciones.
                </Text>

                <Text style={styles.cardSubtitle}>
                  5. Uso responsable: Verifica la información, adjunta fotos útiles y usa un lenguaje respetuoso en tus reportes.
                </Text>

                <Text style={styles.cardSubtitle}>
                  6. Beneficios: Promueve la participación ciudadana, facilita la acción rápida de autoridades y contribuye a barrios más sostenibles.
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
    backgroundColor: "#ffffffe2",
  },
  scroll: {
    flexGrow: 1,
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
  image: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    marginTop: 12,
  },
});
