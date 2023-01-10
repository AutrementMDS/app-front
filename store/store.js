import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getItem(key) {
  return await AsyncStorage.getItem(key);
}

export async function setItem(key, value) {
  return await AsyncStorage.setItem(key, value);
}

export async function removeItem(key) {
  return await AsyncStorage.removeItem(key);
}
