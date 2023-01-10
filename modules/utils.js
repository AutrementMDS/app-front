import { Dimensions, Platform } from "react-native";

export function isOnWeb() {
  return Platform.OS === "web" && Dimensions.get("window").width > 1000;
}
