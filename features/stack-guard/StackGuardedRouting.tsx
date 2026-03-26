import { Stack } from "expo-router";
import { useAuthContext } from "../auth/store/AuthProvider";

export default function StackGuardedRouting() {
  const { isLoggedIn } = useAuthContext();
  const isResponder = true;
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Protected guard={isResponder}>
            <Stack.Screen name="responder" />
          </Stack.Protected>
          <Stack.Screen name="public/report" />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="auth" />
        </Stack.Protected>
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
}
