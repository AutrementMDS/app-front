import * as React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { getItem, setItem, removeItem } from "../store/store.native";

export function CompteScreen({ navigation }) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    getItem("user").then((user) => {
      if (!user) {
        // navigation.navigate("Waiting");
        return;
      }
      let parsed = JSON.parse(user);
      setUser(parsed);
      //  navigation.setOptions({ title: parsed?.username ?? "" });
    });
  }, [user]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {user && (
        <>
          <Button
            onPress={() => {
              navigation.navigate("Login");
              removeItem("user", null);
            }}
          >
            Log out
          </Button>
        </>
      )}
    </View>
  );
}
