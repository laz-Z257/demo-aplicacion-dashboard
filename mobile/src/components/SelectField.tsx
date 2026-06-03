import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { ChevronDown } from "lucide-react-native";

interface SelectFieldProps {
  label: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function SelectField({
  label,
  options,
  selectedValue,
  onSelect,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <View className="mb-[14px] w-full">
      <Text
        className="text-[13px] font-inter text-[#1F2366] mb-1.5 ml-1"
        style={{ fontWeight: "600" }}
      >
        {label}
      </Text>

      <TouchableOpacity
        onPress={() => setOpen(true)}
        activeOpacity={0.7}
        className="h-[52px] rounded-[10px] bg-white border border-[#D1D5DB] px-[14px] flex-row items-center justify-between"
      >
        <Text className="text-base text-text-dark font-inter">
          {selectedValue}
        </Text>
        <ChevronDown size={20} color="#6B7280" strokeWidth={2} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          className="flex-1 bg-black/30 justify-center items-center"
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View className="bg-white rounded-[14px] w-[85%] max-h-[340px] overflow-hidden">
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const isSelected = item === selectedValue;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      onSelect(item);
                      setOpen(false);
                    }}
                    activeOpacity={0.6}
                    className={`px-5 py-[14px] border-b border-[#F3F4F6] ${
                      isSelected ? "bg-[#EEEDF8]" : ""
                    }`}
                  >
                    <Text
                      className={`text-base font-inter ${
                        isSelected
                          ? "text-[#4338CA] font-bold"
                          : "text-text-dark"
                      }`}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
