import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import "@/libs/i18n";
import { supabase } from "@/libs/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useThemeStore } from "@/store/useThemeStore";
import { tamaguiConfig } from "@/tamagui.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { QueryClientManager } from "reactotron-react-query";
import { TamaguiProvider } from "tamagui";

SplashScreen.preventAutoHideAsync();

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
  const systemColorScheme = useColorScheme();
  const { isLoggedIn, isAuthInitialized } = useAuthStore();
  const { colorScheme: storedScheme, _hasHydrated } = useThemeStore();
  const { _hasHydrated: isLanguageHydrated } = useLanguageStore();

  const effectiveScheme =
    storedScheme === "system" ? (systemColorScheme ?? "light") : storedScheme;

  useEffect(() => {
    const init = async () => {
      try {
        const [session, claims] = await Promise.all([
          supabase.auth.refreshSession(),
          supabase.auth.getClaims(),
        ]);

        if (claims?.error || session?.error) {
          throw new Error(
            claims?.error?.message || session?.error?.message || "Lỗi xác thực",
          );
        }

        useAuthStore.setState({
          session: session?.data?.session || null,
          claims: claims?.data?.claims || null,
          isLoggedIn: true,
          isAuthInitialized: true,
        });
      } catch {
        useAuthStore.setState({
          claims: null,
          session: null,
          isLoggedIn: false,
          isAuthInitialized: true,
        });
      }
    };

    init();
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getClaims().then(({ data }) => {
        if (data?.claims) {
          useAuthStore.setState({
            claims: data.claims,
            isLoggedIn: !!data.claims?.sub,
            isAuthInitialized: true,
          });
          return;
        }

        useAuthStore.setState({
          claims: null,
          isLoggedIn: false,
          isAuthInitialized: true,
        });
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isAuthInitialized && _hasHydrated && isLanguageHydrated) {
      SplashScreen.hideAsync();
    }
  }, [isAuthInitialized, _hasHydrated, isLanguageHydrated]);

  if (!isAuthInitialized || !_hasHydrated || !isLanguageHydrated) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={effectiveScheme}>
        <ThemeProvider
          value={effectiveScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack initialRouteName={isLoggedIn ? "(tabs)" : "(auth)"}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(my-wallets)"
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
          <StatusBar style={effectiveScheme === "dark" ? "light" : "dark"} />
        </ThemeProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
