import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      <Stack.Screen
        name="task"
        options={{ title: "Assign Task", headerBackTitle: "Back" }}
      />
    </Stack>
  );
}
