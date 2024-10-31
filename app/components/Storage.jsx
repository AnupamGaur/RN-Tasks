import * as SecureStore from 'expo-secure-store';

const saveData = async (key,value) => {
  try {
      await SecureStore.setItemAsync(key, JSON.stringify(value));
      return "Saved Successfully"
  } catch (error) {
      
  }
}

const removeData = async (key) => {
  try {
      await SecureStore.deleteItemAsync(key);
      return "Removed Successfully"
  } catch (error) {
      return e
  }
}

const fetchData = async (key) => {
  let result = await SecureStore.getItemAsync(key);
  if(result){
      return JSON.parse(result)
  }
  else{
      return null
  }    
}

export default {saveData,fetchData,removeData};