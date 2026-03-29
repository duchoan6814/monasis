import MenuItem from "@/components/profile/MenuItem";
import { supabase } from "@/libs/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useThemeStore } from "@/store/useThemeStore";
import {
  BarChart3,
  Bell,
  ChevronRight,
  Globe,
  HelpCircle,
  Languages,
  LogOut,
  Mail,
  Moon,
  Pencil,
  RefreshCw,
  Shield,
  Star,
  Target,
  Wallet2,
} from "@tamagui/lucide-icons-2";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Button,
  Heading,
  Paragraph,
  ScrollView,
  Separator,
  SizableText,
  Strong,
  Switch,
  Text,
  XStack,
  YStack,
} from "tamagui";

const SectionHeader = ({ title }: { title: string }) => (
  <XStack px="$4" pt="$5" pb="$1">
    <SizableText size="$2" col="$color9">
      <Strong>{title?.toUpperCase()}</Strong>
    </SizableText>
  </XStack>
);

const getInitials = (fullName: string, email: string): string => {
  if (fullName) {
    const parts = fullName.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return fullName.slice(0, 2).toUpperCase();
  }
  return email.slice(0, 2).toUpperCase();
};

const appVersion = Constants.expoConfig?.version ?? "1.0.0";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useTranslation();
  const { session } = useAuthStore();
  const { colorScheme, toggleDarkMode } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();

  const isDark = colorScheme === "dark";

  const email = session?.user?.email ?? "";
  const fullName = (session?.user?.user_metadata?.full_name as string) ?? "";
  const initials = getInitials(fullName, email);
  const displayName =
    fullName || email.split("@")[0] || t("profile.defaultUser");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    useAuthStore.setState({ claims: null, session: null, isLoggedIn: false });
    router.replace("/(auth)");
  };

  const handleLanguageChange = () => {
    Alert.alert(t("language.title"), undefined, [
      {
        text: t("language.vi"),
        onPress: () => setLanguage("vi"),
        style: language === "vi" ? "destructive" : "default",
      },
      {
        text: t("language.en"),
        onPress: () => setLanguage("en"),
        style: language === "en" ? "destructive" : "default",
      },
      { text: t("language.cancel"), style: "cancel" },
    ]);
  };

  return (
    <YStack f={1} bc="$background" style={{ paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Page title */}
        <YStack px="$4" pt="$4" pb="$2">
          <Heading size="$7">{t("profile.title")}</Heading>
        </YStack>

        {/* Profile Card */}
        <YStack mx="$4" mt="$3" br="$5" bc="$color5">
          <XStack px="$4" py="$5" ai="center" gap="$4">
            {/* Avatar */}
            <YStack w={64} h={64} br={32} bc="$color" ai="center" jc="center">
              <SizableText size="$6" fow="600" col="white">
                {initials}
              </SizableText>
            </YStack>

            {/* Info */}
            <YStack f={1} gap="$1">
              <SizableText fos="$5" fow="700" col="$color12" numberOfLines={1}>
                {displayName}
              </SizableText>
              <Paragraph size="$3" col="$color10" numberOfLines={1}>
                {email}
              </Paragraph>
            </YStack>

            {/* Edit button */}
            <YStack
              w="$3"
              h="$3"
              br="$10"
              bc="$color3"
              ai="center"
              jc="center"
              pressStyle={{ o: 0.7 }}
            >
              <Pencil size={16} col="$color10" />
            </YStack>
          </XStack>

          {/* Stats row */}
          <Separator />
          <XStack>
            {[
              { label: t("profile.stats.transactions"), value: "—" },
              { label: t("profile.stats.wallets"), value: "—" },
              { label: t("profile.stats.goals"), value: "—" },
            ].map((stat, idx, arr) => (
              <YStack
                key={stat.label}
                f={1}
                ai="center"
                py="$3"
                brw={idx < arr.length - 1 ? 1 : 0}
                brc="$color5"
              >
                <Text fos="$5" fow="700" col="$color12">
                  {stat.value}
                </Text>
                <SizableText size="$2" col="$color9">
                  {stat.label}
                </SizableText>
              </YStack>
            ))}
          </XStack>
        </YStack>

        {/* Finance Section */}
        <SectionHeader title={t("profile.sections.finance")} />
        <YStack mx="$4" br="$4" bc="$color2" ov="hidden">
          <MenuItem
            icon={<Wallet2 size={16} col="$blue10" />}
            label={t("profile.finance.wallets")}
            onPress={() => router.push("/(my-wallets)")}
          />
          <Separator />
          <MenuItem
            icon={<BarChart3 size={16} col="$green10" />}
            label={t("profile.finance.categories")}
            disabled
          />
          <Separator />
          <MenuItem
            icon={<RefreshCw size={16} col="$orange10" />}
            label={t("profile.finance.recurring")}
            disabled
          />
          <Separator />
          <MenuItem
            icon={<Target size={16} col="$purple10" />}
            label={t("profile.finance.savingGoals")}
            disabled
          />
        </YStack>

        {/* Settings Section */}
        <SectionHeader title={t("profile.sections.settings")} />
        <YStack mx="$4" br="$4" bc="$color2" ov="hidden">
          <MenuItem
            icon={<Bell size={16} col="$yellow10" />}
            label={t("profile.settings.notifications")}
            disabled
          />
          <Separator />
          <MenuItem
            icon={<Globe size={16} col="$blue10" />}
            label={t("profile.settings.currency")}
            disabled
          />
          <Separator />
          <MenuItem
            icon={<Shield size={16} col="$green10" />}
            label={t("profile.settings.security")}
            disabled
          />
          <Separator />
          <MenuItem
            icon={<Moon size={16} col="$color10" />}
            label={t("profile.settings.darkMode")}
            onPress={toggleDarkMode}
            rightContent={
              <Switch pointerEvents="none" checked={isDark} size="$3">
                <Switch.Thumb />
              </Switch>
            }
          />
          <Separator />
          <MenuItem
            icon={<Languages size={16} col="$purple10" />}
            label={t("profile.settings.language")}
            onPress={handleLanguageChange}
            rightContent={
              <XStack ai="center" gap="$2">
                <Text fos="$3" col="$color9" textTransform="uppercase">
                  {language}
                </Text>
                <ChevronRight size={16} col="$color9" />
              </XStack>
            }
          />
        </YStack>

        {/* Support Section */}
        <SectionHeader title={t("profile.sections.support")} />
        <YStack mx="$4" br="$4" bc="$color2" ov="hidden">
          <MenuItem
            icon={<HelpCircle size={16} col="$blue10" />}
            label={t("profile.support.faq")}
            disabled
          />
          <Separator />
          <MenuItem
            icon={<Mail size={16} col="$orange10" />}
            label={t("profile.support.contact")}
            disabled
          />
          <Separator />
          <MenuItem
            icon={<Star size={16} col="$yellow10" />}
            label={t("profile.support.rate")}
            disabled
          />
        </YStack>

        {/* Logout */}
        <YStack mx="$4" mt="$5">
          <Button
            size="$4"
            bw={1}
            onPress={handleLogout}
            theme="red"
            bg="$red2"
            variant="outlined"
            icon={<LogOut size={18} />}
          >
            <Button.Text fow="600">{t("profile.logout")}</Button.Text>
          </Button>
        </YStack>
        {/* Version Footer */}
        <YStack ai="center" py="$6" gap="$1">
          <SizableText size="$2" col="$color8">
            Monasis v{appVersion}
          </SizableText>
          <SizableText size="$1" col="$color7">
            {t("profile.tagline")}
          </SizableText>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
