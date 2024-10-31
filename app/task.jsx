import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import Divider from "./components/Divider";
import Storage from "./components/Storage";

const Task = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [task, setTask] = useState({
    name: "",
    desc: "",
    country: "",
    status: "pending",
  });

  useEffect(() => {
    fetchCountries();

    // Updated Keyboard listener implementation
    const hideDropdown = () => setShowDropdown(false);
    const keyboardDidHideSubscription = Keyboard.addListener(
      'keyboardDidHide', 
      hideDropdown
    );

    return () => {
      keyboardDidHideSubscription.remove();
    };
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const sortedCountries = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      setCountries(sortedCountries);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch countries");
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    setShowDropdown(true);
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setSearchText(country.name.common);
    setTask({ ...task, country: country.name.common });
    setShowDropdown(false);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="p-4 border border-b-2 border-[#eee]"
      onPress={() => handleSelectCountry(item)}
    >
      <Text className="text-lg">{item.name.common}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View className="flex justify-center items-center p-5">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex justify-center items-center p-5">
        <Text className="text-red text-base">{error}</Text>
      </View>
    );
  }

  const submitTask = async () => {
    let allTask = await Storage.fetchData("task");
    if (!allTask) {
      allTask = [];
    }
    allTask.push(task);
    const saveData = await Storage.saveData("task", allTask);
    alert(task)
    // Reset the form
    setTask({
      name: "",
      desc: "",
      country: "",
      status: "pending",
    });
    setSearchText("");
    setSelectedCountry(null);
    router.navigate("/task")
  };

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      setShowDropdown(false);
    }}>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View className="px-4">
            <View>
              <Text className="text-xl font-bold">Create New Task</Text>
            </View>
            <Divider />
            <Text className="text-base"> User Assigned </Text>
            <TextInput
              value={task.name}
              onChangeText={(e) => setTask({ ...task, name: e })}
              className="border border-[#555] mt-1 p-2 rounded-lg"
              placeholder="Task name"
            />
            <Text className="text-base"> Task Description </Text>
            <TextInput
              value={task.desc}
              multiline
              className="border border-[#555] mt-1 p-2 rounded-lg"
              placeholder="Task description"
              onChangeText={(e) => setTask({ ...task, desc: e })}
            />

            <Text className="text-base"> Country </Text>
            <View style={{ position: 'relative', zIndex: 1 }}>
              <TextInput
                className="border border-[#555] mt-1 p-2 rounded-lg"
                value={searchText}
                onChangeText={handleSearch}
                placeholder="Search for a country..."
                onFocus={() => setShowDropdown(true)}
              />

              {showDropdown && searchText.length > 0 && 
                <View className="absolute top-12 left-0 right-0 bg-white border border-2 border-[#ccc] rounded-md shadow-md">
                  <FlatList
                    data={filteredCountries}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.cca3}
                    keyboardShouldPersistTaps="handled"
                    style={{ maxHeight: 200 }}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                  />
                </View>
              }
            </View>
            
            <Pressable
              className="items-center justify-center py-1 px-2 rounded-md shadow-md bg-blue-500 mt-4"
              onPress={submitTask}
            >
              <Text className="text-lg font-bold tracking-wider text-white">
                Submit
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Task;