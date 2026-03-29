import { Ionicons } from "@expo/vector-icons";
import { ChevronLeft } from "@tamagui/lucide-icons-2";
import { useNavigation, useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SizableText, Text, XStack, YStack, useTheme } from "tamagui";

// ─── HeaderIconButton ────────────────────────────────────────────────────────

export interface HeaderIconButtonProps {
  /** Ionicons glyph name */
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  /** Show a small red badge dot (e.g. unread notifications) */
  badge?: boolean;
  color?: string;
  size?: number;
}

export function HeaderIconButton({
  icon,
  onPress,
  badge = false,
  color,
  size = 20,
}: HeaderIconButtonProps) {
  const theme = useTheme();
  const iconColor =
    color ?? (theme.color12?.val as string | undefined) ?? "#000";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
    >
      <YStack
        w={36}
        h={36}
        br="$4"
        bc="$color3"
        ai="center"
        jc="center"
        position="relative"
      >
        <Ionicons name={icon} size={size} color={iconColor} />
        {badge && (
          <YStack
            position="absolute"
            top={6}
            right={6}
            w={8}
            h={8}
            br={4}
            bc="$red9"
          />
        )}
      </YStack>
    </Pressable>
  );
}

// ─── CustomHeader ─────────────────────────────────────────────────────────────

export interface CustomHeaderProps {
  title: string;
  /** Subtitle displayed below the title */
  subtitle?: string;
  /**
   * Force-show the back button even when navigation cannot go back.
   * By default the button appears only when `navigation.canGoBack()` is true.
   */
  showBack?: boolean;
  /** Force-hide the back button even when navigation can go back */
  hideBack?: boolean;
  /** Custom back handler — defaults to `router.back()` */
  onBack?: () => void;
  /** Right-side action slot */
  right?: React.ReactNode;
  /** Replaces the entire left area (back button area) */
  left?: React.ReactNode;
  /** Default: "left" */
  titleAlign?: "left" | "center";
  /** Removes background and border (for overlay headers) */
  transparent?: boolean;
  /** Hides the bottom border */
  noBorder?: boolean;
}

const LEFT_WIDTH = 44;

export function CustomHeader({
  title,
  subtitle,
  showBack,
  hideBack,
  onBack,
  right,
  left,
  titleAlign = "left",
  transparent = false,
  noBorder = false,
}: CustomHeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const navigation = useNavigation();
  const theme = useTheme();

  const canGoBack = navigation.canGoBack();
  const shouldShowBack = hideBack ? false : showBack || canGoBack;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const borderColor =
    transparent || noBorder
      ? "transparent"
      : ((theme.borderColor?.val as string | undefined) ?? "transparent");
  const bgColor = transparent ? "transparent" : undefined;

  return (
    <YStack
      pt={insets.top}
      bc={bgColor}
      borderBottomWidth={1}
      borderBottomColor={borderColor}
    >
      <XStack h={52} ai="center" px="$3" gap="$2">
        {/* Left area */}
        <XStack w={LEFT_WIDTH} ai="center">
          {left ??
            (shouldShowBack ? (
              <Pressable
                onPress={handleBack}
                style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <YStack
                  w={36}
                  h={36}
                  br="$4"
                  bc="$color3"
                  ai="center"
                  jc="center"
                >
                  <ChevronLeft size={20} col="$color12" />
                </YStack>
              </Pressable>
            ) : null)}
        </XStack>

        {/* Title area */}
        <YStack f={1} ai={titleAlign === "center" ? "center" : "flex-start"}>
          <Text
            fos="$5"
            fow="700"
            col="$color12"
            numberOfLines={1}
            lineHeight={24}
          >
            {title}
          </Text>
          {subtitle ? (
            <SizableText size="$2" col="$color9" numberOfLines={1} mt={1}>
              {subtitle}
            </SizableText>
          ) : null}
        </YStack>

        {/* Right area */}
        <XStack w={LEFT_WIDTH} ai="center" jc="flex-end">
          {right ?? null}
        </XStack>
      </XStack>
    </YStack>
  );
}
