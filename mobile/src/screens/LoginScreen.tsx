import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { User, Lock } from "lucide-react-native";
import Logo from "../components/Logo";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import type { LoginFormData, FormErrors } from "../types";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState<LoginFormData>({
    documento: "",
    contrasena: "",
  });

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.documento.trim()) {
      newErrors.documento = "El documento es requerido";
    }

    if (!form.contrasena.trim()) {
      newErrors.contrasena = "La contraseña es requerida";
    } else if (form.contrasena.length < 4) {
      newErrors.contrasena = "Mínimo 4 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.replace("/chat");
    }, 1500);
  };

  const handleForgotPassword = () => {
    Alert.alert(
      "Recuperar contraseña",
      "Se enviará un enlace a tu correo registrado."
    );
  };

  const cardWidth = Math.min(screenWidth * 0.92, 420);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 32,
          paddingHorizontal: 16,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-gray-bg"
      >
        <View
          style={{ width: cardWidth }}
          className="bg-white rounded-card px-6 pt-6 pb-5"
        >
          <Logo />

          <Text className="text-[26px] font-inter-bold text-text-dark mb-1 text-center">
            Bienvenido de nuevo
          </Text>

          <Text className="text-sm font-inter text-text-muted mb-5 text-center">
            Ingresa tus credenciales para continuar
          </Text>

          <Input
            label="Documento"
            icon={User}
            placeholder="Ingrese su documento"
            value={form.documento}
            onChangeText={(text) => {
              setForm({ ...form, documento: text });
              if (errors.documento) {
                setErrors({ ...errors, documento: undefined });
              }
            }}
            error={errors.documento}
          />

          <Input
            label="Contraseña"
            icon={Lock}
            placeholder="Ingrese su contraseña"
            isPassword
            value={form.contrasena}
            onChangeText={(text) => {
              setForm({ ...form, contrasena: text });
              if (errors.contrasena) {
                setErrors({ ...errors, contrasena: undefined });
              }
            }}
            error={errors.contrasena}
          />

          <TouchableOpacity
            onPress={handleForgotPassword}
            className="self-end mb-5"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text className="text-primary text-sm font-inter-bold">
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>

          <PrimaryButton
            title="Iniciar Sesión"
            onPress={handleLogin}
            loading={loading}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
