import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Xin chào",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Tạo tài khoản",
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "Đăng nhập",
        }}
      />
    </Stack>
  );
}
