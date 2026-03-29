import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, YStack, useTheme } from "tamagui";

export default function BudgetScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const accentColor = theme.accentBackground?.val ?? "#AF36BF";

  return (
    <YStack
      f={1}
      bc="$background"
      ai="center"
      jc="center"
      gap="$4"
      pt={insets.top}
    >
      <YStack
        width={80}
        height={80}
        borderRadius={40}
        bc="$color3"
        ai="center"
        jc="center"
      >
        <Ionicons name="wallet" size={36} color={accentColor} />
      </YStack>
      <Text fontSize={20} fontWeight="700" color="$color12">
        Ngân sách
      </Text>
      <Text fontSize={14} color="$placeholderColor" textAlign="center" px="$6">
        Tính năng đang được phát triển.{"\n"}Sớm ra mắt!
      </Text>
    </YStack>
  );
}
