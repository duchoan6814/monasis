import { supabase } from "@/libs/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import {
  BarChart3,
  Bell,
  ChevronRight,
  CreditCard,
  Globe,
  HelpCircle,
  LogOut,
  Mail,
  Moon,
  Pencil,
  RefreshCw,
  Shield,
  Star,
  Target,
} from "@tamagui/lucide-icons-2";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
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

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  danger?: boolean;
  disabled?: boolean;
  rightContent?: React.ReactNode;
};

const MenuItem = ({
  icon,
  label,
  onPress,
  danger,
  disabled,
  rightContent,
}: MenuItemProps) => (
  <XStack
    ai="center"
    px="$4"
    py="$3"
    gap="$3"
    onPress={disabled ? undefined : onPress}
    pressStyle={disabled ? {} : { o: 0.7 }}
    o={disabled ? 0.45 : 1}
  >
    <XStack
      w="$2.5"
      h="$2.5"
      br="$3"
      bc={danger ? "$red3" : "$color3"}
      ai="center"
      jc="center"
    >
      {icon}
    </XStack>
    <Text f={1} col={danger ? "$red10" : "$color12"} fos="$4">
      {label}
    </Text>
    {rightContent ?? (
      <ChevronRight size={16} col={danger ? "$red8" : "$color9"} />
    )}
  </XStack>
);

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
  const { session } = useAuthStore();
  const { colorScheme, toggleDarkMode } = useThemeStore();

  const isDark = colorScheme === "dark";

  const email = session?.user?.email ?? "";
  const fullName = (session?.user?.user_metadata?.full_name as string) ?? "";
  const initials = getInitials(fullName, email);
  const displayName = fullName || email.split("@")[0] || "Người dùng";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    useAuthStore.setState({ claims: null, session: null, isLoggedIn: false });
    router.replace("/(auth)");
  };

  return (
    <YStack f={1} bc="$background" style={{ paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Page title */}
        <YStack px="$4" pt="$4" pb="$2">
          <Heading size="$7">Tài khoản</Heading>
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
              { label: "Giao dịch", value: "—" },
              { label: "Ví liên kết", value: "—" },
              { label: "Mục tiêu", value: "—" },
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
        <SectionHeader title="Tài chính" />
        <YStack mx="$4" br="$4" bc="$color2" ov="hidden">
          <MenuItem
            icon={<CreditCard size={16} col="$blue10" />}
            label="Tài khoản liên kết"
            disabled
          />
          <Separator />
          <MenuItem
            icon={<BarChart3 size={16} col="$green10" />}
            label="Danh mục chi tiêu"
            disabled
          />
          <Separator />
          <MenuItem
            icon={<RefreshCw size={16} col="$orange10" />}
            label="Giao dịch định kỳ"
            disabled
          />
          <Separator />
          <MenuItem
            icon={<Target size={16} col="$purple10" />}
            label="Mục tiêu tiết kiệm"
            disabled
          />
        </YStack>

        {/* Settings Section */}
        <SectionHeader title="Cài đặt" />
        <YStack mx="$4" br="$4" bc="$color2" ov="hidden">
          <MenuItem
            icon={<Bell size={16} col="$yellow10" />}
            label="Thông báo"
            disabled
          />
          <Separator />
          <MenuItem
            icon={<Globe size={16} col="$blue10" />}
            label="Tiền tệ & Ngôn ngữ"
            disabled
          />
          <Separator />
          <MenuItem
            icon={<Shield size={16} col="$green10" />}
            label="Bảo mật & Quyền riêng tư"
            disabled
          />
          <Separator />
          <MenuItem
            icon={<Moon size={16} col="$color10" />}
            label="Giao diện tối"
            onPress={toggleDarkMode}
            rightContent={
              <Switch pointerEvents="none" checked={isDark} size="$3">
                <Switch.Thumb />
              </Switch>
            }
          />
        </YStack>

        {/* Support Section */}
        <SectionHeader title="Hỗ trợ" />
        <YStack mx="$4" br="$4" bc="$color2" ov="hidden">
          <MenuItem
            icon={<HelpCircle size={16} col="$blue10" />}
            label="Câu hỏi thường gặp"
            disabled
          />
          <Separator />
          <MenuItem
            icon={<Mail size={16} col="$orange10" />}
            label="Liên hệ hỗ trợ"
            disabled
          />
          <Separator />
          <MenuItem
            icon={<Star size={16} col="$yellow10" />}
            label="Đánh giá ứng dụng"
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
            <Button.Text fow="600">Đăng xuất</Button.Text>
          </Button>
        </YStack>
        {/* Version Footer */}
        <YStack ai="center" py="$6" gap="$1">
          <SizableText size="$2" col="$color8">
            Monasis v{appVersion}
          </SizableText>
          <SizableText size="$1" col="$color7">
            Quản lý tài chính cá nhân
          </SizableText>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
