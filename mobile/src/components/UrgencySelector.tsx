import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface UrgencyOption {
  label: string;
  value: string;
}

interface UrgencySelectorProps {
  options: UrgencyOption[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function UrgencySelector({
  options,
  selected,
  onSelect,
}: UrgencySelectorProps) {
  return (
    <View style={{ width: "100%" }}>
      <Text
        style={{
          fontSize: 13,
          color: "#1F2366",
          fontWeight: "600",
          fontFamily: "Inter_400Regular",
          marginBottom: 6,
          marginLeft: 4,
        }}
      >
        Urgencia
      </Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        {options.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              onPress={() => onSelect(opt.value)}
              activeOpacity={0.7}
              style={{
                flex: 1,
                height: 44,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: isSelected ? "#4338CA" : "#D1D5DB",
                backgroundColor: isSelected ? "#D9D6FF" : "#FFFFFF",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Inter_400Regular",
                  fontWeight: isSelected ? "700" : "400",
                  color: isSelected ? "#4338CA" : "#6B7280",
                }}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
