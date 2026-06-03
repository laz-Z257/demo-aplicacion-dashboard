import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ChatHeader from "../components/ChatHeader";
import BotMessageCard from "../components/BotMessageCard";
import ChatBubble from "../components/ChatBubble";
import TypingIndicator from "../components/TypingIndicator";
import ChatInput from "../components/ChatInput";
import BottomTab from "../components/BottomTab";

interface Message {
  id: string;
  type: "bot-card" | "user" | "date" | "typing";
  text?: string;
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "date-1",
    type: "date",
    text: "Hoy",
    timestamp: "",
  },
  {
    id: "bot-card-1",
    type: "bot-card",
    text: "\u00A1Hola! Bienvenido de nuevo. Soy tu Soporte Administrativo, \u00BFen qu\u00E9 puedo ayudarte hoy?",
    timestamp: "09:41 AM",
  },
];

function getTimeString(): string {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const h = hours % 12 || 12;
  const m = minutes.toString().padStart(2, "0");
  return `${h}:${m} ${ampm}`;
}

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const flatListRef = useRef<FlatList<Message>>(null);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [typing, setTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "chatbot" | "reportar" | "historial"
  >("chatbot");

  const handleSend = useCallback((text: string) => {
    setMessages((prev) => {
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        type: "user",
        text,
        timestamp: getTimeString(),
      };
      return [...prev.filter((m) => m.type !== "typing"), userMsg];
    });

    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      setMessages((prev) => {
        const botMsg: Message = {
          id: `bot-card-${Date.now()}`,
          type: "bot-card",
          text: "\u00BFNecesitas ayuda con algo m\u00E1s?",
          timestamp: getTimeString(),
        };
        return [...prev, botMsg];
      });
    }, 2000);
  }, []);

  const handleSubmenuPress = useCallback(
    (label: string) => {
      if (label === "Reportar incidente") {
        router.push("/reportar");
      }
    },
    [router]
  );

  const renderItem = useCallback(({ item }: { item: Message }) => {
    if (item.type === "date") {
      return (
        <View style={{ alignItems: "center", marginVertical: 12 }}>
          <View
            style={{
              backgroundColor: "#E5E7EB",
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 4,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: "#6B7280",
                fontFamily: "Inter_400Regular",
              }}
            >
              {item.text}
            </Text>
          </View>
        </View>
      );
    }

    if (item.type === "bot-card") {
      return (
        <BotMessageCard
          message={item.text || ""}
          timestamp={item.timestamp}
          onSubmenuPress={handleSubmenuPress}
        />
      );
    }

    if (item.type === "typing") {
      return <TypingIndicator />;
    }

    return (
      <ChatBubble isBot={false} timestamp={item.timestamp}>
        <Text
          style={{
            fontSize: 15,
            color: "#FFFFFF",
            fontFamily: "Inter_400Regular",
            lineHeight: 22,
          }}
        >
          {item.text}
        </Text>
      </ChatBubble>
    );
  }, []);

  const msgList = typing
    ? [
        ...messages,
        { id: "typing", type: "typing" as const, text: "", timestamp: "" },
      ]
    : messages;

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <View style={{ paddingTop: insets.top }}>
        <ChatHeader />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={70}
      >
        <FlatList
          ref={flatListRef}
          data={msgList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 8, paddingBottom: 8 }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          showsVerticalScrollIndicator={false}
        />

        <ChatInput onSend={handleSend} />

        <BottomTab
          activeTab={activeTab}
          onTabChange={(tab) => {
            if (tab === "reportar") {
              router.push("/reportar");
              return;
            }
            setActiveTab(tab);
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
}
