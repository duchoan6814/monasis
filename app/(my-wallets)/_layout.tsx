import { Stack } from "expo-router";

const MyWalletLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default MyWalletLayout;
