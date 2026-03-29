import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";

import { CustomTabBar } from "@/components/CustomTabBar";

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: t("tabs.overview") }} />
      <Tabs.Screen name="transactions" options={{ title: t("tabs.transactions") }} />
      <Tabs.Screen name="budget" options={{ title: t("tabs.budget") }} />
      <Tabs.Screen name="profile" options={{ title: t("tabs.profile") }} />
      {/* Hidden from custom tab bar */}
      <Tabs.Screen
        name="explore"
        options={{ href: null, title: "Explore" }}
      />
    </Tabs>
  );
}
