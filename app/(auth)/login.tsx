import Alert from "@/components/ui/Alert";
import { supabase } from "@/libs/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
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
  Spinner,
  Strong,
  Text,
  XStack,
  YStack,
} from "tamagui";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: Yup.string().required("Mật khẩu là bắt buộc"),
});

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const route = useRouter();

  const login = async (data: Yup.InferType<typeof formSchema>) => {
    const res = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      throw new Error(res.error.message);
    }

    return res;
  };

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: login,
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(formSchema),
  });

  const goRegister = () => {
    route.push("/register");
  };

  const onSubmit = async (data: Yup.InferType<typeof formSchema>) => {
    mutateAsync(
      { email: data.email, password: data.password },
      {
        onSuccess: async (res) => {
          const claims = await supabase.auth.getClaims();

          if (claims?.error) {
            supabase.auth.signOut();
            throw new Error(claims.error.message);
          }

          useAuthStore.setState({
            claims: claims?.data?.claims || null,
            session: res.data.session,
            isLoggedIn: true,
          });
          route.push("/(tabs)");
        },
      },
    );
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

        {isError && (
          <XStack px="$4" mt="$4">
            <Alert
              message={error?.message || "Có lỗi xảy ra vui lòng thử lại"}
            />
          </XStack>
        )}

        <YStack px="$4" mt="$4">
          <Form gap="$2" onSubmit={handleSubmit(onSubmit)}>
            <YStack>
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                  <>
                    <Label
                      col={fieldState?.invalid ? "$red10" : undefined}
                      htmlFor={field?.name}
                      aria-invalid={fieldState?.invalid}
                    >
                      Email
                    </Label>
                    <Input
                      id={field?.name}
                      placeholder="Nhập email của bạn"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      aria-invalid={fieldState?.invalid}
                      aria-errormessage="email-error"
                      theme={fieldState?.invalid ? "red" : undefined}
                      {...field}
                    />
                    {fieldState?.invalid && fieldState?.error?.message && (
                      <SizableText
                        size="$2"
                        col="$red10"
                        mt="$1"
                        id="email-error"
                      >
                        {fieldState.error.message}
                      </SizableText>
                    )}
                  </>
                )}
              />
            </YStack>
            <YStack>
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => (
                  <>
                    <Label
                      col={fieldState?.invalid ? "$red10" : undefined}
                      htmlFor={field?.name}
                      aria-invalid={fieldState?.invalid}
                    >
                      Mật khẩu
                    </Label>
                    <Input
                      id={field?.name}
                      placeholder="Nhập mật khẩu của bạn"
                      secureTextEntry
                      aria-invalid={fieldState?.invalid}
                      aria-errormessage="password-error"
                      theme={fieldState?.invalid ? "red" : undefined}
                      {...field}
                    />
                    {fieldState?.invalid && fieldState?.error?.message && (
                      <SizableText
                        size="$2"
                        col="$red10"
                        mt="$1"
                        id="password-error"
                      >
                        {fieldState.error.message}
                      </SizableText>
                    )}
                  </>
                )}
              />
            </YStack>
            <XStack jc="flex-end" mt="$2">
              <SizableText col="$blue10" size="$2">
                <Strong>Quên mật khẩu?</Strong>
              </SizableText>
            </XStack>

            <Form.Trigger asChild>
              <Button
                icon={isPending ? <Spinner color="$white" /> : undefined}
                disabled={isPending}
                size="$4"
                mt="$4"
                bc="$color"
              >
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
