import * as React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Button } from "react-native-paper";
import { CustomButton, CustomInput } from "../components/CustomButton";
import { login, register } from "../modules/database";
import { getItem, setItem } from "../store/store.native";

export function Login({ navigation }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  async function checkLogin() {
    let res = await login(username, password);
    if (res.status == 200) {
      setItem("user", JSON.stringify(res.data));
      navigation.navigate("Home");
    } else {
      setError(res.error);
    }
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
            value={username}
          />
          <CustomInput
            controller={setPassword}
            type="password"
            placeholder="Password"
            value={password}
          />
          {error !== "" && <Text style={styles.error}>{error}</Text>}
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
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  function goToLogin() {
    navigation.navigate("Login");
  }

  function goToLanding() {
    navigation.navigate("LandingPage");
  }

  async function checkRegister() {
    let res = await register(username, email, password);
    console.log(res);
    if (res.status == 200) {
      setItem("user", JSON.stringify(res.data));
      console.log(res.data);
      navigation.navigate("LandingPage");
    } else {
      setError(res.error);
    }
  }

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View>
          {/* <CustomInput controller={setUsername} type="text" placeholder="Nom" /> */}
          <CustomInput
            controller={setUsername}
            type="text"
            placeholder="Prénom"
            value={username}
          />
          <CustomInput
            controller={setEmail}
            type="text"
            placeholder="Email"
            value={email}
          />
          {/* <CustomInput
            controller={setPassword}
            type="text"
            placeholder="Téléphone"
          /> */}
          <CustomInput
            controller={setPassword}
            type="password"
            placeholder="Mot de passe"
            value={password}
          />
          {error !== "" && <Text style={styles.error}>{error}</Text>}
        </View>

        <View>
          <CustomButton
            type="primary"
            text="Valider"
            onPress={() => checkRegister()}
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
  error: {
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: "#ffa4a4",
    padding: 10,
  },
});
