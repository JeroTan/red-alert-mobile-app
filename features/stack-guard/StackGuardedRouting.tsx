import { Stack } from "expo-router";

export default function StackGuardedRouting() {
  const isResponder = true;
  const isLogin = true;
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {/* <Stack.Protected guard={isLogin}>
            <Stack.Protected guard={isResponder}>
              <Stack.Screen name="responder" />
            </Stack.Protected>
          </Stack.Protected>
          <Stack.Protected guard={!isLogin}>
            <Stack.Screen name="auth" />
          </Stack.Protected>
          <Stack.Screen name="/" /> */}
      </Stack>
    </>
  );
}
