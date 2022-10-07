import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import { CustomButton, CustomInput } from "../components/CustomButton";
import { login } from "../modules/database";
import { getItem, setItem } from "../store/store.native";

export function Login({ navigation }) {
  const [username, setUsername] = React.useState("test");
  const [password, setPassword] = React.useState("Azerty123");

  function checkLogin() {
    login(username, password, (res) => {
      if (res.status == 200) {
        setItem("user", JSON.stringify(res.data));
        navigation.navigate("Home");
      }
    });
  }

  function goToRegister() {
    navigation.navigate("Register");
  }

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View>
          <CustomInput
            controller={setUsername}
            type="text"
            placeholder="Username"
          />
          <CustomInput
            controller={setPassword}
            type="password"
            placeholder="Password"
          />
        </View>

        <View>
          <CustomButton
            type="primary"
            text="Valider"
            onPress={() => checkLogin()}
          ></CustomButton>

          <CustomButton
            type="secondary"
            text="Créer un compte"
            onPress={() => goToRegister()}
          ></CustomButton>
        </View>
      </View>
    </View>
  );
}

export function Register({ navigation }) {
  const [username, setUsername] = React.useState("test");
  const [password, setPassword] = React.useState("Azerty123.");

  function goToLogin() {
    navigation.navigate("Login");
  }

  function goToLanding() {
    navigation.navigate("LandingPage");
  }

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View>
          <CustomInput controller={setUsername} type="text" placeholder="Nom" />
          <CustomInput
            controller={setUsername}
            type="text"
            placeholder="Prénom"
          />
          <CustomInput
            controller={setUsername}
            type="text"
            placeholder="Email"
          />
          <CustomInput
            controller={setPassword}
            type="text"
            placeholder="Téléphone"
          />
          <CustomInput
            controller={setPassword}
            type="password"
            placeholder="Mot de passe"
          />
        </View>

        <View>
          <CustomButton
            type="primary"
            text="Valider"
            onPress={() => goToLanding()}
          ></CustomButton>

          <CustomButton
            type="secondary"
            text="Se connecter"
            onPress={() => goToLogin()}
          ></CustomButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FAFAFA",
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
  },
});
