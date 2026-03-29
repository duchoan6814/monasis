import { CustomHeader } from "@/components/CustomHeader";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, YStack, useTheme } from "tamagui";

export default function BudgetScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const accentColor = theme.accentBackground?.val ?? "#AF36BF";

  return (
    <YStack f={1} bc="$background">
      <CustomHeader title={t("tabs.budget")} hideBack />
      <YStack f={1} ai="center" jc="center" gap="$4">
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
          {t("tabs.budget")}
        </Text>
        <Text fontSize={14} color="$placeholderColor" textAlign="center" px="$6">
          Tính năng đang được phát triển.{"\n"}Sớm ra mắt!
        </Text>
      </YStack>
    </YStack>
  );
}
