import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import React from "react";
import { Platform, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, XStack, YStack, useTheme } from "tamagui";

type TabConfig = {
  name: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
};

const TAB_CONFIGS: TabConfig[] = [
  {
    name: "index",
    label: "Tổng quan",
    icon: "home-outline",
    activeIcon: "home",
  },
  {
    name: "transactions",
    label: "Giao dịch",
    icon: "list-outline",
    activeIcon: "list",
  },
  {
    name: "budget",
    label: "Ngân sách",
    icon: "wallet-outline",
    activeIcon: "wallet",
  },
  {
    name: "profile",
    label: "Tài khoản",
    icon: "person-outline",
    activeIcon: "person",
  },
];

const FAB_SIZE = 60;
const FAB_LIFT = 20;
const TAB_BAR_HEIGHT = 64;

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const bgColor = theme.background?.val ?? "#ffffff";
  const activeColor = theme.accentBackground?.val ?? "#AF36BF";
  const inactiveColor = theme.placeholderColor?.val ?? "#9BA1A6";
  const borderColor = theme.borderColor?.val ?? "#e0e0e0";

  const visibleTabs = state.routes.filter((route) =>
    TAB_CONFIGS.some((c) => c.name === route.name)
  );

  const handleTabPress = (routeName: string, routeKey: string) => {
    const isFocused = state.routes[state.index].name === routeName;
    if (Platform.OS !== "web") {
      Haptics.selectionAsync();
    }
    if (!isFocused) {
      navigation.navigate(routeName, { key: routeKey } as never);
    }
  };

  const handleFabPress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    // TODO: Open AI assistant modal
  };

  return (
    <YStack
      style={{
        paddingBottom: insets.bottom,
        backgroundColor: bgColor,
        borderTopWidth: 1,
        borderTopColor: borderColor,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 12,
      }}
    >
      <XStack
        height={TAB_BAR_HEIGHT}
        ai="center"
        jc="space-around"
        px="$1"
        position="relative"
      >
        {TAB_CONFIGS.slice(0, 2).map((config) => {
          const route = visibleTabs.find((r) => r.name === config.name);
          if (!route) return null;
          const isActive = state.routes[state.index].name === config.name;
          return (
            <TabItem
              key={config.name}
              config={config}
              isActive={isActive}
              activeColor={activeColor}
              inactiveColor={inactiveColor}
              onPress={() => handleTabPress(config.name, route.key)}
            />
          );
        })}

        {/* Center FAB placeholder space */}
        <YStack width={FAB_SIZE + 16} height={TAB_BAR_HEIGHT} />

        {TAB_CONFIGS.slice(2).map((config) => {
          const route = visibleTabs.find((r) => r.name === config.name);
          if (!route) return null;
          const isActive = state.routes[state.index].name === config.name;
          return (
            <TabItem
              key={config.name}
              config={config}
              isActive={isActive}
              activeColor={activeColor}
              inactiveColor={inactiveColor}
              onPress={() => handleTabPress(config.name, route.key)}
            />
          );
        })}

        {/* Floating AI Button */}
        <YStack
          position="absolute"
          alignSelf="center"
          style={{
            top: -(FAB_LIFT),
            left: "50%",
            marginLeft: -(FAB_SIZE / 2),
          }}
        >
          <Pressable
            onPress={handleFabPress}
            style={({ pressed }) => ({
              width: FAB_SIZE,
              height: FAB_SIZE,
              borderRadius: FAB_SIZE / 2,
              backgroundColor: activeColor,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: activeColor,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.45,
              shadowRadius: 14,
              elevation: 10,
              transform: [{ scale: pressed ? 0.93 : 1 }],
            })}
          >
            <Ionicons name="sparkles" size={26} color="#ffffff" />
          </Pressable>
        </YStack>
      </XStack>
    </YStack>
  );
}

type TabItemProps = {
  config: TabConfig;
  isActive: boolean;
  activeColor: string;
  inactiveColor: string;
  onPress: () => void;
};

function TabItem({
  config,
  isActive,
  activeColor,
  inactiveColor,
  onPress,
}: TabItemProps) {
  const color = isActive ? activeColor : inactiveColor;
  return (
    <Pressable
      onPress={onPress}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <YStack ai="center" jc="center" gap="$1" py="$1">
        <Ionicons
          name={isActive ? config.activeIcon : config.icon}
          size={24}
          color={color}
        />
        <Text
          fontSize={10}
          fontWeight={isActive ? "600" : "400"}
          color={color}
          numberOfLines={1}
        >
          {config.label}
        </Text>
      </YStack>
    </Pressable>
  );
}
