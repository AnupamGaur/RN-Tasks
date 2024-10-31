import { Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Divider from "./Divider";
import React from "react";
import Storage from "./Storage";

export default Card = (params) => {
  const carddata = params.data;

  const updateTask = async (name) => {
    let alltasks = await Storage.fetchData('task')
    let newTask = null
    if(alltasks){
        newTask = await alltasks.map((x) => {
            if(x.name == name){
                x.status = 'done'
            }
            return x
        });
        const saveData = await Storage.saveData('task',newTask);
        params.onrefresh()
    }
}

  return (
    <View className="p-4 border border-gray-200  bg-white dark:border-gray-700 dark:bg-gray-800 rounded-2xl my-1">
      <View className="flex flex-row items-center justify-between">
        <View className="flex w-4/5">
          <Text className={`text-xl font-medium my-[0.35rem] dark:text-white ${(params.data.status === "done"?`line-through decoration-4`:``)}`} >
            {carddata.name}
          </Text>
          <Text className="text-base font-normal my-0.25 text-gray-900 dark:text-white">
            {carddata.desc}
          </Text>
        </View>
        <View>
          <Pressable onPress={()=>updateTask(params.data.name)}>
            {carddata.status === "done" ? (
              <MaterialCommunityIcons
                name="check-circle"
                size={28}
                color="#0860fb"
              />
            ) : (
              <MaterialCommunityIcons
                name="circle-outline"
                size={28}
                color="#0860fb"
              />
            )}
          </Pressable>
        </View>
      </View>
      <Divider />
      <View>
        <Text
          className="text-gray-900 dark:text-gray-300"
        >
          {carddata.country}
        </Text>
      </View>
    </View>
  );
};
