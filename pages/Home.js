import * as React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { getUsers, register } from "../modules/database";
import { Home } from "@carbon/icons-react";

export function HomeScreen({ navigation }) {
  // React.useEffect(() => {
  //   //let user = getUsers();
  //   register("userTes", "usermail@mail.com", "Azerty123.", (res) => {
  //     console.log(res);
  //   });
  // }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>
      <Home />
      <Button
        onPress={() => {
          navigation.navigate("Panier");
        }}
      >
        test
      </Button>
    </View>
  );
}
