import { View, Text, SafeAreaView } from "react-native";

export const Page = (props) => {
  return (
    <SafeAreaView style={{ padding: 10, paddingTop: 50, paddingBottom: 50 }}>
      {props.children}
    </SafeAreaView>
  );
};
