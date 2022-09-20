import { AsyncStorage } from "react-native";

function getItem(key) {
  return AsyncStorage.getItem(key);
}

function setItem(key, value) {
  return AsyncStorage.setItem(key, value);
}
