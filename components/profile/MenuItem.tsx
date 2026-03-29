import { ChevronRight } from "@tamagui/lucide-icons-2";
import { Text, XStack } from "tamagui";

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

export default MenuItem;
