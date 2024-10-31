import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";

export default function TabLayout() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }} >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
          tabBarInactiveBackgroundColor: `${colorScheme=="dark"?'#1f2937':'#fff'}`,
          // tabBaractiveBackgroundColor: "#062005",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
          tabBarInactiveBackgroundColor: `${colorScheme=="dark"?'#1f2937':'#fff'}`,
          // tabBaractiveBackgroundColor: "blue",
        }}
      />
    </Tabs>
  );
}
