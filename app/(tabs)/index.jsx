import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import {  useEffect, useState, useCallback } from "react";
import Storage from '../components/Storage';
import { router, useFocusEffect } from 'expo-router';
export default function Tab() {
  const [task, setTask] = useState([
    // {
    //   text: "Client Review Call",
    //   desc: "App Redesign App Redesign App Redesign App Redesign App Redesign",
    //   date: "Sunday 22 Oct",
    //   status: "done",
    // },
    // {
    //   text: "Client Review Call 1",
    //   desc: "App Redesign",
    //   date: "Sunday 22 Oct",
    //   status: "done",
    // }
  ]);

  useFocusEffect(
    useCallback(()=>{
        const getTask = async () => {
            let alltasks = await Storage.fetchData('task')
            setTask(alltasks);
        }
        getTask()
    },[])
    );

  const refreshTask = async () => {
    let alltasks = await Storage.fetchData('task')
    setTask(alltasks);
}

  return (
    <SafeAreaView className="flex-1 dark:bg-neutral-900">
      <ScrollView className="p-4">
        <View className="flex flex-row justify-between">
          <View>
            <Text className="text-3xl font-black dark:text-white">All Tasks</Text>
            <Text className="text-lg font-medium my-[0.35rem] text-gray-900 dark:text-white">
              30th October 24
            </Text>
          </View>
          <View className="flex">
            <Pressable
              onPress={() => router.navigate("/task")}
              className="bg-blue-100 py-1.5 px-2.5 rounded-lg dark:bg-slate-900"
              android_ripple={{ color: "#ddd", radius: 100 }}
            >
              <Text className="text-lg font-medium my-[0.35rem] text-gray-900 dark:text-white">
                + New Task
              </Text>
            </Pressable>
          </View>
        </View>
        {task && task.map((x, i) => {
          return <Card key={i} data={x} onrefresh={() => refreshTask()}></Card>;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
