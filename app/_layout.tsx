import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuthStore } from "@/store/useAuthStore";
import { tamaguiConfig } from "@/tamagui.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryClientManager } from "reactotron-react-query";
import { TamaguiProvider } from "tamagui";

export const unstable_settings = {
  anchor: "(tabs)",
};

const queryClient = new QueryClient();

if (__DEV__) {
  import("../ReactotronConfig");
  new QueryClientManager({
    queryClient,
  });
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isLoggedIn } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            {!isLoggedIn ? (
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            ) : (
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            )}

            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
