import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Button,
  Form,
  Heading,
  Input,
  Label,
  Paragraph,
  ScrollView,
  Separator,
  SizableText,
  Span,
  Strong,
  Text,
  XStack,
  YStack,
} from "tamagui";

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const route = useRouter();

  const goRegister = () => {
    route.push("/register");
  };

  return (
    <YStack f={1} style={{ paddingTop: insets.top }} bc="$background">
      <XStack bc="$background" px="$4">
        <Button
          onPress={route.back}
          size="$4"
          circular
          icon={<Ionicons name="arrow-back" size={24} color="$color10" />}
        />
      </XStack>
      <ScrollView>
        <YStack px="$4" mt="$4">
          <Heading>Chào mừng trở lại</Heading>
          <Paragraph mt="$2">
            Đăng nhập để tiếp tục quản lý dòng tiền của bạn.
          </Paragraph>
        </YStack>
        <YStack px="$4" mt="$4">
          <Form gap="$2">
            <YStack>
              <Label htmlFor="email" aria-required>
                Email
              </Label>
              <Input id="email" placeholder="Nhập email của bạn" />
            </YStack>
            <YStack>
              <Label htmlFor="password" aria-required>
                Mật khẩu
              </Label>
              <Input
                id="password"
                placeholder="Nhập mật khẩu của bạn"
                secureTextEntry
              />
            </YStack>
            <XStack jc="flex-end" mt="$2">
              <SizableText col="$blue10" size="$2">
                <Strong>Quên mật khẩu?</Strong>
              </SizableText>
            </XStack>

            <Form.Trigger asChild>
              <Button size="$4" mt="$4" bc="$color">
                <Button.Text col="$white">
                  <Strong>Đăng nhập</Strong>
                </Button.Text>
              </Button>
            </Form.Trigger>
          </Form>
          <XStack mt="$6" ai="center" gap="$2">
            <Separator />
            <Text>HOẶC TIẾP TỤC VỚI</Text>
            <Separator />
          </XStack>

          <XStack gap="$4" mt="$4">
            <Button f={1}>Google</Button>
            <Button f={1}>Apple</Button>
          </XStack>

          <YStack>
            <Paragraph mt="$6" ta="center">
              Chưa có tài khoản?{" "}
              <Span col="$blue10" onPress={goRegister}>
                <Strong>Đăng ký ngay</Strong>
              </Span>
            </Paragraph>
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
};

export default LoginScreen;
