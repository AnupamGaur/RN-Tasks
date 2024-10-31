import { View, Text, StyleSheet, Switch, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import Storage from "../components/Storage";
export default function Tab() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const clearData = async () => {
    let dataRemove = await Storage.removeData("task");
    alert(dataRemove);
  };
  return (
    
    <View className="flex-1 p-4 mt-8  dark:bg-neutral-900 space-y-6">
      <Text className="text-2xl dark:text-white font-extrabold"> Settings </Text>
      <StatusBar style={colorScheme=="dark"? "light": "dark"} />
      <View className="flex-1 items-center">
      <Pressable onPress={() => clearData()} className="w-4/5">
        <Text className="bg-blue-500/30 rounded-lg text-center p-2 dark:text-white border-[1px] border-blue-800 text-base">
          Clear Storage
        </Text>
      </Pressable>
      <View className="flex flex-row mt-8 justify-between items-center w-full">

        <Text className="dark:text-white text-lg">Dark Mode</Text>

        <View>
        <Switch value={colorScheme == "dark"} onChange={toggleColorScheme} />
        </View>
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
