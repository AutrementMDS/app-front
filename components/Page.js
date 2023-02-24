import { View, Text, SafeAreaView, Platform } from "react-native";
import { isOnWeb } from "../modules/utils";

export const Page = (props) => {
  let style = {};
  if (isOnWeb()) {
    style = { padding: 10, flex: 1 };
  } else {
    style = { padding: 10, paddingTop: 40, paddingBottom: 50, flex: 1 };
  }

  return <SafeAreaView style={style}>{props.children}</SafeAreaView>;
};
