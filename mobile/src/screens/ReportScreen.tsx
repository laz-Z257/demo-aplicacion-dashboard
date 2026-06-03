import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Send,
  MessageSquare,
  AlertTriangle,
  History,
} from "lucide-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import ReportHeader from "../components/ReportHeader";
import TextField from "../components/TextField";
import TextAreaField from "../components/TextAreaField";
import UrgencySelector from "../components/UrgencySelector";
import Logo from "../components/Logo";

const AnimatedTouchable =
  Animated.createAnimatedComponent(TouchableOpacity);

const URGENCY_OPTIONS = [
  { label: "Baja", value: "baja" },
  { label: "Media", value: "media" },
  { label: "Alta", value: "alta" },
];

interface FormErrors {
  nombre?: string;
  documento?: string;
  puntoVenta?: string;
  descripcion?: string;
}

export default function ReportScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [nombre, setNombre] = useState("");
  const [documento, setDocumento] = useState("");
  const [puntoVenta, setPuntoVenta] = useState("");
  const [telefono, setTelefono] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [urgencia, setUrgencia] = useState("media");

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { stiffness: 400, damping: 25 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { stiffness: 400, damping: 25 });
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!documento.trim()) newErrors.documento = "El documento es requerido";
    if (!puntoVenta.trim())
      newErrors.puntoVenta = "El punto de venta es requerido";
    if (!descripcion.trim())
      newErrors.descripcion = "La descripción es requerida";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Reporte enviado",
        "Tu incidente ha sido registrado exitosamente. Nuestro equipo técnico lo revisará pronto.",
        [
          {
            text: "Ir al chat",
            onPress: () => router.replace("/chat"),
          },
        ]
      );
    }, 1500);
  };

  return (
    <View className="flex-1 bg-[#F5F6FA]">
      <View style={{ paddingTop: insets.top }}>
        <ReportHeader />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            paddingTop: 24,
            paddingBottom: 32,
            paddingHorizontal: 16,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View className="items-center mb-4">
            <Logo size={80} />
          </View>

          {/* Title */}
          <Text
            className="text-[34px] text-[#1F2366] text-center mb-2"
            style={{ fontFamily: "Inter_700Bold", fontWeight: "700" }}
          >
            Reportar un Incidente
          </Text>

          {/* Description */}
          <Text className="text-[15px] font-inter text-[#6B7280] text-center mb-6 max-w-[300px]">
            Por favor, completa los detalles para que nuestro equipo
            técnico pueda ayudarte.
          </Text>

          {/* Form Card */}
          <View
            className="bg-white rounded-[18px] border border-[#E5E7EB] p-5 w-[92%]"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <TextField
              label="Nombre Completo"
              placeholder="Tu nombre completo"
              value={nombre}
              onChangeText={(t) => {
                setNombre(t);
                if (errors.nombre)
                  setErrors({ ...errors, nombre: undefined });
              }}
              error={errors.nombre}
            />

            <TextField
              label="CC / Documento"
              placeholder="Número de documento"
              value={documento}
              onChangeText={(t) => {
                setDocumento(t);
                if (errors.documento)
                  setErrors({ ...errors, documento: undefined });
              }}
              error={errors.documento}
              keyboardType="numeric"
            />

            <TextField
              label="Punto de Venta"
              placeholder="Nombre del punto de venta"
              value={puntoVenta}
              onChangeText={(t) => {
                setPuntoVenta(t);
                if (errors.puntoVenta)
                  setErrors({ ...errors, puntoVenta: undefined });
              }}
              error={errors.puntoVenta}
            />

            <TextField
              label="Número de Teléfono"
              placeholder="Tu número de contacto"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />

            <TextAreaField
              label="Descripción"
              placeholder="Describe qué sucedió..."
              value={descripcion}
              onChangeText={(t) => {
                setDescripcion(t);
                if (errors.descripcion)
                  setErrors({ ...errors, descripcion: undefined });
              }}
              error={errors.descripcion}
            />

            <UrgencySelector
              options={URGENCY_OPTIONS}
              selected={urgencia}
              onSelect={setUrgencia}
            />

            {/* Submit Button */}
            <AnimatedTouchable
              onPress={handleSubmit}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              disabled={loading}
              activeOpacity={0.85}
              style={[
                animatedStyle,
                {
                  width: "100%" as const,
                  height: 52,
                  borderRadius: 10,
                  backgroundColor: loading ? "rgba(42, 35, 126, 0.7)" : "#2A237E",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 16,
                  shadowColor: "#2A237E",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.25,
                  shadowRadius: 8,
                  elevation: 5,
                },
              ]}
            >
              <Send size={18} color="#FFFFFF" strokeWidth={2.5} />
              <Text
                className="text-white text-base ml-2"
                style={{ fontFamily: "Inter_700Bold" }}
              >
                {loading ? "Enviando..." : "Enviar Reporte"}
              </Text>
            </AnimatedTouchable>
          </View>

          {/* Secondary Action */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center justify-center mt-5"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MessageSquare size={18} color="#1F2366" strokeWidth={2} />
            <Text className="text-[#1F2366] text-sm font-inter ml-2">
              Volver al chat
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Navigation */}
      <View className="bg-white flex-row border-t border-[#E5E7EB] px-2 pb-5 pt-1 rounded-t-[16px]">
        <TouchableOpacity
          onPress={() => router.replace("/chat")}
          activeOpacity={0.7}
          className="flex-1 items-center justify-center py-2.5 mx-1 rounded-xl"
        >
          <MessageSquare size={22} color="#6B7280" strokeWidth={2} />
          <Text className="text-[11px] font-inter text-[#6B7280] mt-0.5">
            Chatbot
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-1 items-center justify-center py-2.5 mx-1 rounded-xl bg-[#EEEDF8]"
        >
          <AlertTriangle size={22} color="#1F2366" strokeWidth={2.5} />
          <Text
            className="text-[11px] font-inter text-[#1F2366] mt-0.5"
            style={{ fontWeight: "600" }}
          >
            Reportar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace("/chat")}
          activeOpacity={0.7}
          className="flex-1 items-center justify-center py-2.5 mx-1 rounded-xl"
        >
          <History size={22} color="#6B7280" strokeWidth={2} />
          <Text className="text-[11px] font-inter text-[#6B7280] mt-0.5">
            Historial
          </Text>
        </TouchableOpacity>
      </View>

      {/* Safe area bottom inset */}
      <View style={{ height: insets.bottom, backgroundColor: "#FFFFFF" }} />
    </View>
  );
}
