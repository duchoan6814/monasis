import { Tabs } from "expo-router";
import React from "react";

import { CustomTabBar } from "@/components/CustomTabBar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Tổng quan" }} />
      <Tabs.Screen name="transactions" options={{ title: "Giao dịch" }} />
      <Tabs.Screen name="budget" options={{ title: "Ngân sách" }} />
      <Tabs.Screen name="profile" options={{ title: "Tài khoản" }} />
      {/* Hidden from custom tab bar */}
      <Tabs.Screen
        name="explore"
        options={{ href: null, title: "Explore" }}
      />
    </Tabs>
  );
}
