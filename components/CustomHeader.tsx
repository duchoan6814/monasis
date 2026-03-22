import { Ionicons } from "@expo/vector-icons"; // Thư viện icon có sẵn trong Expo
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Text, XStack, YStack } from "tamagui";

interface CustomHeaderProps {
  title?: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode; // Cho phép chèn nút bấm tùy chỉnh bên phải
}

export const CustomHeader = ({
  title,
  showBackButton = true,
  rightComponent,
}: CustomHeaderProps) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <YStack pt={insets.top} bc="$background" zi={100} elevation={3}>
      <XStack h={60} ai="center" jc="space-between" px="$3">
        <XStack w={50} ai="center">
          {showBackButton && (
            <Button
              size="$4"
              circular
              chromeless
              onPress={() => router.back()}
              icon={<Ionicons name="arrow-back" size={24} color="$color10" />}
              pressStyle={{ scale: 0.9, bc: "$backgroundHover" }}
            />
          )}
        </XStack>

        <YStack f={1} ai="center" jc="center">
          {title && (
            <Text
              numberOfLines={1} // Cắt chữ nếu quá dài
            >
              {title}
            </Text>
          )}
        </YStack>

        <XStack w={50} ai="center" jc="flex-end">
          {rightComponent || <YStack w={24} />}
        </XStack>
      </XStack>
    </YStack>
  );
};
