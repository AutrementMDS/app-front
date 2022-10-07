import { View, Text } from "react-native";

export const Page = (props) => {
  return (
    <View style={{ padding: 10, paddingTop: 50, paddingBottom: 50 }}>
      {props.children}
    </View>
  );
};
