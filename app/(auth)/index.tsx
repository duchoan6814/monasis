import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Paragraph, SizableText, Strong, YStack } from "tamagui";

const AuthScreen = () => {
  const route = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack f={1} px="$4">
        <YStack f={1}></YStack>
        <YStack>
          <SizableText size="$7">
            <Strong>Quản lý tài chính</Strong>
          </SizableText>
          <SizableText size="$7">
            <Strong> thông minh hơn với AI</Strong>
          </SizableText>
          <Paragraph size="$4" mt="$6">
            Theo dõi chi tiêu, lập kế hoạch ngân sách và nhận lời khuyên từ trợ
            lý AI cá nhân của riêng bạn.
          </Paragraph>

          <YStack gap="$3" mt="$4">
            <Button bg="$color" onPress={() => route.push("/register")}>
              <Button.Text col="$white">Bắt đầu ngay</Button.Text>
            </Button>
            <Button onPress={() => route.push("/login")}>
              Tôi đã có tài khoản
            </Button>
          </YStack>
        </YStack>
      </YStack>
    </SafeAreaView>
  );
};

export default AuthScreen;
