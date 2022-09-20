import * as React from "react";
import { View, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { login } from "../modules/database";
import { getItem, setItem } from "../store/store.native";

export function Login({ navigation }) {
  const [username, setUsername] = React.useState("test");
  const [password, setPassword] = React.useState("Azerty123.");

  function checkLogin() {
    console.log("login");
    console.log(username);
    console.log(password);
    login(username, password, (res) => {
      if (res.status == 200) {
        setItem("user", JSON.stringify(res.data));
        navigation.navigate("Home");
      }
    });
  }

  return (
    <View
      style={{
        flexDirection: "column",
        padding: 30,
        justifyContent: "center",
      }}
    >
      <StyledTextInput controller={setUsername} placeholder="Username" />
      <StyledTextInput controller={setPassword} placeholder="Password" />
      <Button onPress={() => checkLogin()}>Valider</Button>
    </View>
  );
}

export function Register() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <input></input>
      <input></input>
      <input></input>
    </View>
  );
}

export function StyledTextInput(props) {
  const [textInputValue, setTextInputValue] = React.useState("");

  return (
    <TextInput
      style={{
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        placeholderTextColor: "gray",
        backgroundColor: "transparent",
      }}
      onChangeText={(text) => {
        setTextInputValue(text);
        props.controller(text);
      }}
      value={textInputValue}
      placeholder={props.placeholder}
    />
  );
}
