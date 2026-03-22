import { Ionicons } from "@expo/vector-icons";
import { } from "@expo/vector-icons/MaterialIcons";
import { yupResolver } from "@hookform/resolvers/yup";
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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const goLogin = () => {
    route.push("/login");
  };

  const onSubmit = (data: unknown) => {
    console.log("Form data:", data);
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
              <Button size="$4" mt="$6" bc="$color">
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
