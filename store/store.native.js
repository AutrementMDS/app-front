import * as SecureStore from "expo-secure-store";

module.exports = {
  getItem,
  setItem,
  removeItem,
};

async function getItem(key) {
  return await SecureStore.getItemAsync(key);
}

async function setItem(key, value) {
  return await SecureStore.setItemAsync(key, value);
}

async function removeItem(key) {
  return await SecureStore.deleteItemAsync(key);
}
