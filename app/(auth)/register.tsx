import Alert from "@/components/ui/Alert";
import { supabase } from "@/libs/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { } from "@expo/vector-icons/MaterialIcons";
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
  Text,
  XStack,
  YStack,
} from "tamagui";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
  name: Yup.string().required("Họ và tên là bắt buộc"),
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: Yup.string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .required("Mật khẩu là bắt buộc"),
});

const RegisterScreen = () => {
  const insets = useSafeAreaInsets();
  const route = useRouter();

  const register = async (data: Yup.InferType<typeof formSchema>) => {
    const res = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.name,
        },
      },
    });

    if (res?.error) {
      throw new Error(res.error.message);
    }

    return res;
  };

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: register,
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(formSchema),
  });

  const goLogin = () => {
    route.push("/login");
  };

  const onSubmit = async (data: Yup.InferType<typeof formSchema>) => {
    mutateAsync(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
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
          <Heading>Tạo tài khoản</Heading>
          <Paragraph mt="$2">
            Hãy để Monasis giúp bạn tối ưu hóa tài chính.
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
                name="name"
                render={({ field, fieldState }) => (
                  <>
                    <Label
                      col={fieldState?.invalid ? "$red10" : undefined}
                      htmlFor="name"
                      aria-invalid={fieldState?.invalid}
                    >
                      Họ và tên
                    </Label>
                    <Input
                      id="name"
                      placeholder="Nhập họ và tên của bạn"
                      aria-invalid={fieldState?.invalid}
                      aria-errormessage="name-error"
                      theme={fieldState?.invalid ? "red" : undefined}
                      {...field}
                    />
                    {fieldState?.invalid && fieldState?.error?.message && (
                      <SizableText
                        size="$2"
                        col="$red10"
                        mt="$1"
                        id="name-error"
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
                      placeholder="Địa chỉ email của bạn"
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

            <Form.Trigger asChild>
              <Button
                icon={isPending ? <Spinner color="$white" /> : undefined}
                disabled={isPending}
                size="$4"
                mt="$6"
                bc="$color"
              >
                <Button.Text col="$white">Đăng ký tài khoản</Button.Text>
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
              Đã có tài khoản?{" "}
              <Span col="$blue10" onPress={goLogin}>
                Đăng nhập
              </Span>
            </Paragraph>
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
};

export default RegisterScreen;
